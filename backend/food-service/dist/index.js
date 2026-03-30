import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import foodRoutes from './routes/food.routes.js';
dotenv.config();
const app = express();
const PORT = process.env.FOOD_SERVICE_PORT || 3002;
const mongoUri = process.env.MONGO_URI || `mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '27017'}/${process.env.DB_NAME || 'surplusx'}`;
app.locals.useDatabase = false;

// Middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
mongoose.connect(mongoUri).then(() => {
  app.locals.useDatabase = true;
  console.log('🔗 Food service connected to MongoDB');
}).catch(() => {
  app.locals.useDatabase = false;
  console.warn('⚠️ Food service running in in-memory mode (MongoDB unavailable)');
});

// Routes
app.use('/api/food', foodRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'food-service',
    mode: app.locals.useDatabase ? 'mongodb' : 'in-memory'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Food service running on port ${PORT}`);
});
export default app;