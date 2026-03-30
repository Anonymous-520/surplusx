import express from 'express';
import dotenv from 'dotenv';
import foodRoutes from './routes/food.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.FOOD_SERVICE_PORT || 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/food', foodRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'food-service' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Food service running on port ${PORT}`);
});

export default app;