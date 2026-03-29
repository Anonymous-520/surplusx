import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import foodRoutes from './routes/food.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.FOOD_SERVICE_PORT || 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
  .then(() => console.log('🔗 Food service connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

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