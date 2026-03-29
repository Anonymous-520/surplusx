import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import foodRoutes from './routes/food.routes.js';
import userRoutes from './routes/user.routes.js';
import deliveryRoutes from './routes/delivery.routes.js';
import authMiddleware from './middleware/auth.middleware.js';
import errorMiddleware from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/food', authMiddleware, foodRoutes);
app.use('/api/users', userRoutes);
app.use('/api/deliveries', authMiddleware, deliveryRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Error handling middleware
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

export default app;