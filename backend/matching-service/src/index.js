import express from 'express';
import dotenv from 'dotenv';
import { matchNgo } from './services/matchNgo.js';

dotenv.config();

const app = express();
const PORT = process.env.MATCHING_SERVICE_PORT || 3003;

app.use(express.json());

const ngos = [
  {
    id: 'ngo-001',
    name: 'San Francisco Food Bank',
    location: { latitude: 37.7694, longitude: -122.3917 },
    maxCapacity: 100,
    currentCapacity: 40
  },
  {
    id: 'ngo-002',
    name: 'Mission District Shelter',
    location: { latitude: 37.7597, longitude: -122.4192 },
    maxCapacity: 75,
    currentCapacity: 20
  },
  {
    id: 'ngo-003',
    name: 'Tenderloin Community Kitchen',
    location: { latitude: 37.785, longitude: -122.412 },
    maxCapacity: 50,
    currentCapacity: 10
  }
];

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'matching-service' });
});

app.post('/api/match', (req, res) => {
  try {
    const result = matchNgo(req.body, ngos);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/match/:foodListingId', (req, res) => {
  const fallbackFoodListing = {
    id: req.params.foodListingId,
    title: 'Fallback Food Listing',
    foodType: 'prepared',
    quantity: 10,
    preparationDate: new Date().toISOString(),
    location: { latitude: 37.7749, longitude: -122.4194 }
  };

  try {
    const result = matchNgo(fallbackFoodListing, ngos);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Matching service running on port ${PORT}`);
});

export default app;
