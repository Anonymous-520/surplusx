// Food Controller - API Gateway
import axios from 'axios';

const FOOD_SERVICE_URL = process.env.FOOD_SERVICE_URL || 'http://food-service:3002';

export const createFoodListing = async (req, res) => {
  try {
    const response = await axios.post(`${FOOD_SERVICE_URL}/api/food`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Create food listing error:', error);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data?.error || 'Failed to create food listing'
    });
  }
};

export const getFoodListings = async (req, res) => {
  try {
    const response = await axios.get(`${FOOD_SERVICE_URL}/api/food`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Get food listings error:', error);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data?.error || 'Failed to get food listings'
    });
  }
};

export const getFoodListingById = async (req, res) => {
  try {
    const response = await axios.get(`${FOOD_SERVICE_URL}/api/food/${req.params.id}`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Get food listing by ID error:', error);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data?.error || 'Failed to get food listing'
    });
  }
};