import express from 'express';
import mongoose from 'mongoose';
import Food from '../models/Food.model.js';
const router = express.Router();
const listings = [];
const toResponseShape = record => ({
  id: record._id?.toString?.() || record.id,
  title: record.title,
  description: record.description,
  foodType: record.foodType,
  quantity: record.quantity,
  quantityUnit: record.quantityUnit,
  preparationDate: record.preparationDate,
  expiryDate: record.expiryDate,
  location: record.location,
  contactName: record.contactName,
  contactPhone: record.contactPhone,
  specialInstructions: record.specialInstructions,
  status: record.status,
  createdAt: record.createdAt,
  updatedAt: record.updatedAt
});
const normalizeListing = (payload = {}) => {
  const createdAt = Date.now();
  const id = payload.id || `food_${createdAt}`;
  return {
    id,
    title: payload.title || 'Untitled Listing',
    description: payload.description || '',
    foodType: payload.foodType || 'prepared',
    quantity: Number(payload.quantity) || 0,
    quantityUnit: payload.quantityUnit || 'kg',
    preparationDate: payload.preparationDate || new Date().toISOString(),
    expiryDate: payload.expiryDate || new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    location: {
      address: payload.address || payload.location?.address || '',
      city: payload.city || payload.location?.city || 'N/A',
      state: payload.state || payload.location?.state || 'N/A',
      zipCode: payload.zipCode || payload.location?.zipCode || '',
      latitude: Number(payload.latitude ?? payload.location?.latitude) || 0,
      longitude: Number(payload.longitude ?? payload.location?.longitude) || 0
    },
    contactName: payload.contactName || 'Unknown',
    contactPhone: payload.contactPhone || '',
    specialInstructions: payload.specialInstructions || '',
    status: payload.status || 'AVAILABLE',
    createdAt,
    updatedAt: createdAt
  };
};
router.post('/', async (req, res) => {
  const useDatabase = Boolean(req.app.locals.useDatabase);
  if (!useDatabase) {
    const listing = normalizeListing(req.body);
    listings.unshift(listing);
    return res.status(201).json(listing);
  }
  try {
    const payload = req.body || {};
    const doc = new Food({
      donorId: payload.donorId || new mongoose.Types.ObjectId(),
      title: payload.title || 'Untitled Listing',
      description: payload.description || 'No description provided',
      foodType: payload.foodType || 'prepared',
      quantity: Number(payload.quantity) > 0 ? Number(payload.quantity) : 0.1,
      quantityUnit: payload.quantityUnit || 'kg',
      preparationDate: payload.preparationDate || new Date(),
      expiryDate: payload.expiryDate || new Date(Date.now() + 6 * 60 * 60 * 1000),
      location: {
        address: payload.address || payload.location?.address || 'Unknown address',
        city: payload.city || payload.location?.city || 'N/A',
        state: payload.state || payload.location?.state || 'N/A',
        zipCode: payload.zipCode || payload.location?.zipCode || '00000',
        latitude: Number(payload.latitude ?? payload.location?.latitude) || 0,
        longitude: Number(payload.longitude ?? payload.location?.longitude) || 0
      },
      contactName: payload.contactName || 'Unknown',
      contactPhone: payload.contactPhone || 'N/A',
      specialInstructions: payload.specialInstructions || '',
      status: payload.status || 'AVAILABLE'
    });
    const saved = await doc.save();
    return res.status(201).json(toResponseShape(saved));
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to create food listing'
    });
  }
});
router.get('/', async (req, res) => {
  const useDatabase = Boolean(req.app.locals.useDatabase);
  if (!useDatabase) {
    return res.json(listings);
  }
  try {
    const docs = await Food.find().sort({
      createdAt: -1
    });
    return res.json(docs.map(toResponseShape));
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch food listings'
    });
  }
});
router.get('/:id', async (req, res) => {
  const useDatabase = Boolean(req.app.locals.useDatabase);
  if (!useDatabase) {
    const listing = listings.find(item => item.id === req.params.id);
    if (!listing) {
      return res.status(404).json({
        error: 'Food listing not found'
      });
    }
    return res.json(listing);
  }
  try {
    const doc = await Food.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({
        error: 'Food listing not found'
      });
    }
    return res.json(toResponseShape(doc));
  } catch (error) {
    return res.status(400).json({
      error: 'Invalid food listing id'
    });
  }
});
export default router;