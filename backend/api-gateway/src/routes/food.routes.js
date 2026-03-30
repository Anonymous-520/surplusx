import express from 'express';
import axios from 'axios';
import { createFoodListing, getFoodListings, getFoodListingById } from '../controllers/food.controller.js';

const router = express.Router();
const MATCHING_SERVICE_URL = process.env.MATCHING_SERVICE_URL || 'http://localhost:3003';

// Create a new food listing
router.post('/', createFoodListing);

// Get all food listings
router.get('/', getFoodListings);

// Get a specific food listing
router.get('/:id', getFoodListingById);

// Get matches for a food listing
router.get('/:id/matches', async (req, res) => {
  try {
    const { data } = await axios.get(`${MATCHING_SERVICE_URL}/api/match/${req.params.id}`);
    res.json(data);
  } catch (error) {
    console.error('Matching service error:', error);
    res.status(500).json({ error: 'Failed to get matches' });
  }
});

export default router;