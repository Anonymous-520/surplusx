import { findNearestNgos, calculatePriorityScore } from '../algorithms/nearestNgo.js';

/**
 * Match food listing to the best suitable NGO
 * @param {Object} foodListing - Food listing details
 * @param {Array} ngos - Available NGOs
 * @returns {Object} Best matched NGO with matching details
 */
export const matchNgo = (foodListing, ngos) => {
  if (!ngos || ngos.length === 0) {
    throw new Error('No NGOs available for matching');
  }

  // Find NGOs within reasonable distance (10km)
  const nearbyNgos = findNearestNgos(foodListing.location, ngos, 10000);

  if (nearbyNgos.length === 0) {
    throw new Error('No NGOs within acceptable distance');
  }

  // Calculate priority scores for each nearby NGO
  const scoredNgos = nearbyNgos.map(ngo => {
    const foodWithDistance = { ...foodListing, distance: ngo.distance };
    const priorityScore = calculatePriorityScore(foodWithDistance, ngo);
    return { ...ngo, priorityScore };
  });

  // Sort by priority score (descending)
  const sortedNgos = scoredNgos.sort((a, b) => b.priorityScore - a.priorityScore);

  // Return the best match
  const bestMatch = sortedNgos[0];

  return {
    foodListingId: foodListing.id,
    ngoId: bestMatch.id,
    ngoName: bestMatch.name,
    distance: bestMatch.distance,
    priorityScore: bestMatch.priorityScore,
    estimatedPickupTime: calculateEstimatedPickupTime(bestMatch.distance),
    matchingDetails: {
      freshnessFactor: getFreshnessFactor(foodListing),
      quantityFactor: Math.min(1, foodListing.quantity / 50),
      distanceFactor: Math.max(0, 1 - (bestMatch.distance / 10000)),
      capacityFactor: Math.min(1, bestMatch.currentCapacity / bestMatch.maxCapacity)
    }
  };
};

/**
 * Calculate estimated pickup time based on distance
 * @param {number} distance - Distance in meters
 * @returns {string} Estimated time in minutes
 */
const calculateEstimatedPickupTime = (distance) => {
  // Assume average speed of 30 km/h for urban delivery
  const speedKmH = 30;
  const distanceKm = distance / 1000;
  const timeHours = distanceKm / speedKmH;
  const timeMinutes = Math.ceil(timeHours * 60);
  return `${timeMinutes} minutes`;
};

/**
 * Get freshness factor for food listing
 * @param {Object} foodListing - Food listing details
 * @returns {number} Freshness factor (0-1)
 */
const getFreshnessFactor = (foodListing) => {
  const now = new Date();
  const prepDate = new Date(foodListing.preparationDate);
  const hoursSincePrep = (now - prepDate) / (1000 * 60 * 60);
  return Math.max(0, 1 - (hoursSincePrep / 24));
};

/**
 * Batch match multiple food listings to NGOs
 * @param {Array} foodListings - Array of food listings
 * @param {Array} ngos - Available NGOs
 * @returns {Array} Array of matching results
 */
export const batchMatchNgos = (foodListings, ngos) => {
  return foodListings.map(foodListing => {
    try {
      return matchNgo(foodListing, ngos);
    } catch (error) {
      return {
        foodListingId: foodListing.id,
        error: error.message
      };
    }
  });
};