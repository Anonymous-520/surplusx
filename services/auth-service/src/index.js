import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from './models/User.model.js';

dotenv.config();

const app = express();
const PORT = process.env.AUTH_SERVICE_PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'surplusx-dev-secret';
const mongoUri = process.env.MONGO_URI || `mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '27017'}/${process.env.DB_NAME || 'surplusx'}`;
const hasMongoConfig = Boolean(mongoUri);
let useDatabase = false;
const inMemoryUsers = [];
const ALLOWED_ROLES = new Set(['DONOR', 'NGO', 'VOLUNTEER', 'ADMIN']);

const normalizeRole = (value) => {
  const upper = String(value || 'DONOR').toUpperCase();
  return ALLOWED_ROLES.has(upper) ? upper : 'DONOR';
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection (optional for local development)
if (hasMongoConfig) {
  mongoose.connect(mongoUri)
    .then(() => {
      useDatabase = true;
      console.log('🔗 Auth service connected to MongoDB');
    })
    .catch(() => {
      useDatabase = false;
      console.warn('⚠️ Auth service running in in-memory mode (MongoDB unavailable)');
    });
} else {
  console.log('ℹ️ Auth service running in in-memory mode (MongoDB not configured)');
}

// User registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const normalizedRole = normalizeRole(role);

    // Check if user exists
    const existingUser = useDatabase
      ? await User.findOne({ email })
      : inMemoryUsers.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = useDatabase
      ? new User({
        name,
        email,
        password: hashedPassword,
        phone,
        role: normalizedRole
      })
      : {
        _id: `user_${Date.now()}`,
        name,
        email,
        password: hashedPassword,
        phone,
        role: normalizedRole
      };

    if (useDatabase) {
      await user.save();
    } else {
      inMemoryUsers.push(user);
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = useDatabase
      ? await User.findOne({ email })
      : inMemoryUsers.find((item) => item.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get user profile
app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = useDatabase
      ? await User.findById(decoded.userId).select('-password')
      : inMemoryUsers
        .filter((item) => item._id === decoded.userId)
        .map(({ password, ...safeUser }) => safeUser)[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'auth-service' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Auth service running on port ${PORT}`);
});

export default app;