import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Delivery from './models/Delivery.model.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.DELIVERY_SERVICE_PORT || 3004;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
  .then(() => console.log('🔗 Delivery service connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Real-time delivery tracking
io.on('connection', (socket) => {
  console.log('📡 New client connected:', socket.id);

  socket.on('join-delivery', (deliveryId) => {
    socket.join(deliveryId);
    console.log(`👤 Socket ${socket.id} joined delivery ${deliveryId}`);
  });

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// Create delivery
app.post('/api/deliveries', async (req, res) => {
  try {
    const { foodListingId, ngoId, volunteerId, route } = req.body;

    const delivery = new Delivery({
      foodListingId,
      ngoId,
      volunteerId,
      status: 'ASSIGNED',
      route
    });

    await delivery.save();

    // Notify clients
    io.to(delivery._id.toString()).emit('delivery-update', {
      deliveryId: delivery._id,
      status: delivery.status
    });

    res.status(201).json(delivery);
  } catch (error) {
    console.error('Create delivery error:', error);
    res.status(500).json({ error: 'Failed to create delivery' });
  }
});

// Update delivery status
app.put('/api/deliveries/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    // Notify clients
    io.to(delivery._id.toString()).emit('delivery-update', {
      deliveryId: delivery._id,
      status: delivery.status
    });

    res.json(delivery);
  } catch (error) {
    console.error('Update delivery error:', error);
    res.status(500).json({ error: 'Failed to update delivery' });
  }
});

// Get delivery by ID
app.get('/api/deliveries/:id', async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id)
      .populate('foodListingId')
      .populate('ngoId')
      .populate('volunteerId');

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    res.json(delivery);
  } catch (error) {
    console.error('Get delivery error:', error);
    res.status(500).json({ error: 'Failed to get delivery' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'delivery-service' });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Delivery service running on port ${PORT}`);
  console.log(`📡 WebSocket server running on ws://localhost:${PORT}`);
});

export default app;