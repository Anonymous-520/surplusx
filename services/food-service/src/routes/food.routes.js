import express from 'express';

const router = express.Router();
const listings = [];

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

router.post('/', (req, res) => {
  const listing = normalizeListing(req.body);
  listings.unshift(listing);
  res.status(201).json(listing);
});

router.get('/', (req, res) => {
  res.json(listings);
});

router.get('/:id', (req, res) => {
  const listing = listings.find((item) => item.id === req.params.id);

  if (!listing) {
    return res.status(404).json({ error: 'Food listing not found' });
  }

  res.json(listing);
});

export default router;
