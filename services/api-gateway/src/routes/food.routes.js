import express from 'express';
import { createFoodListing, getFoodListings, getFoodListingById } from '../controllers/food.controller.js';

const router = express.Router();

// Create a new food listing
router.post('/', createFoodListing);

// Get all food listings
router.get('/', getFoodListings);

// Get a specific food listing
router.get('/:id', getFoodListingById);

// Get matches for a food listing
router.get('/:id/matches', async (req, res) => {
  try {
    // This would call the matching service
    const response = await fetch(`http://matching-service:3003/api/match/${req.params.id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Matching service error:', error);
    res.status(500).json({ error: 'Failed to get matches' });
  }
});

export default router;