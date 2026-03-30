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
const mongoUri = process.env.MONGO_URI || `mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '27017'}/${process.env.DB_NAME || 'surplusx'}`;
const hasMongoConfig = Boolean(mongoUri);
let useDatabase = false;
const inMemoryDeliveries = [];

// Middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Database connection (optional for local development)
if (hasMongoConfig) {
  mongoose.connect(mongoUri).then(() => {
    useDatabase = true;
    console.log('🔗 Delivery service connected to MongoDB');
  }).catch(() => {
    useDatabase = false;
    console.warn('⚠️ Delivery service running in in-memory mode (MongoDB unavailable)');
  });
} else {
  console.log('ℹ️ Delivery service running in in-memory mode (MongoDB not configured)');
}

// Real-time delivery tracking
io.on('connection', socket => {
  console.log('📡 New client connected:', socket.id);
  socket.on('join-delivery', deliveryId => {
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
    const {
      foodListingId,
      ngoId,
      volunteerId,
      route
    } = req.body;
    const delivery = useDatabase ? new Delivery({
      foodListingId,
      ngoId,
      volunteerId,
      status: 'ASSIGNED',
      route
    }) : {
      _id: `delivery_${Date.now()}`,
      foodListingId,
      ngoId,
      volunteerId,
      status: 'ASSIGNED',
      route,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    if (useDatabase) {
      await delivery.save();
    } else {
      inMemoryDeliveries.push(delivery);
    }

    // Notify clients
    io.to(delivery._id.toString()).emit('delivery-update', {
      deliveryId: delivery._id,
      status: delivery.status
    });
    res.status(201).json(delivery);
  } catch (error) {
    console.error('Create delivery error:', error);
    res.status(500).json({
      error: 'Failed to create delivery'
    });
  }
});

// Update delivery status
app.put('/api/deliveries/:id/status', async (req, res) => {
  try {
    const {
      status
    } = req.body;
    const delivery = useDatabase ? await Delivery.findByIdAndUpdate(req.params.id, {
      status,
      updatedAt: new Date()
    }, {
      new: true
    }) : (() => {
      const existing = inMemoryDeliveries.find(item => item._id === req.params.id);
      if (!existing) {
        return null;
      }
      existing.status = status;
      existing.updatedAt = new Date();
      return existing;
    })();
    if (!delivery) {
      return res.status(404).json({
        error: 'Delivery not found'
      });
    }

    // Notify clients
    io.to(delivery._id.toString()).emit('delivery-update', {
      deliveryId: delivery._id,
      status: delivery.status
    });
    res.json(delivery);
  } catch (error) {
    console.error('Update delivery error:', error);
    res.status(500).json({
      error: 'Failed to update delivery'
    });
  }
});

// Get delivery by ID
app.get('/api/deliveries/:id', async (req, res) => {
  try {
    const delivery = useDatabase ? await Delivery.findById(req.params.id).populate('foodListingId').populate('ngoId').populate('volunteerId') : inMemoryDeliveries.find(item => item._id === req.params.id);
    if (!delivery) {
      return res.status(404).json({
        error: 'Delivery not found'
      });
    }
    res.json(delivery);
  } catch (error) {
    console.error('Get delivery error:', error);
    res.status(500).json({
      error: 'Failed to get delivery'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'delivery-service'
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Delivery service running on port ${PORT}`);
  console.log(`📡 WebSocket server running on ws://localhost:${PORT}`);
});
export default app;