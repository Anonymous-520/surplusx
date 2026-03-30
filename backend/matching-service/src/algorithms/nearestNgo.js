import haversine from 'haversine-distance';

/**
 * Calculate distance between two points using Haversine formula
 * @param {Object} point1 - { latitude, longitude }
 * @param {Object} point2 - { latitude, longitude }
 * @returns {number} Distance in meters
 */
export const calculateDistance = (point1, point2) => {
  const distance = haversine(point1, point2);
  return distance; // distance in meters
};

/**
 * Find nearest NGOs to a food listing location
 * @param {Object} foodLocation - { latitude, longitude }
 * @param {Array} ngos - Array of NGO objects with location
 * @param {number} maxDistance - Maximum distance in meters
 * @returns {Array} Filtered NGOs within max distance, sorted by proximity
 */
export const findNearestNgos = (foodLocation, ngos, maxDistance = 10000) => {
  return ngos
    .map(ngo => {
      const distance = calculateDistance(foodLocation, ngo.location);
      return { ...ngo, distance };
    })
    .filter(ngo => ngo.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);
};

/**
 * Calculate priority score for NGO matching
 * @param {Object} foodListing - Food listing details
 * @param {Object} ngo - NGO details
 * @returns {number} Priority score (higher is better)
 */
export const calculatePriorityScore = (foodListing, ngo) => {
  // Freshness factor (0-1, where 1 is very fresh)
  const now = new Date();
  const prepDate = new Date(foodListing.preparationDate);
  const hoursSincePrep = (now - prepDate) / (1000 * 60 * 60);
  const freshnessFactor = Math.max(0, 1 - (hoursSincePrep / 24)); // Decays over 24 hours

  // Quantity factor (normalized)
  const quantityFactor = Math.min(1, foodListing.quantity / 50); // Cap at 50kg

  // Distance factor (inverse, normalized to 10km max)
  const distanceFactor = Math.max(0, 1 - (foodListing.distance / 10000));

  // NGO capacity factor
  const capacityFactor = Math.min(1, ngo.currentCapacity / ngo.maxCapacity);

  // Combine factors with weights
  const priorityScore = (
    freshnessFactor * 0.4 +
    quantityFactor * 0.2 +
    distanceFactor * 0.3 +
    capacityFactor * 0.1
  );

  return Number(priorityScore.toFixed(4));
};