import express from 'express';
import axios from 'axios';

const router = express.Router();
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

router.post('/register', async (req, res, next) => {
  try {
    const { data } = await axios.post(`${AUTH_SERVICE_URL}/api/auth/register`, req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { data } = await axios.post(`${AUTH_SERVICE_URL}/api/auth/login`, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const { data } = await axios.get(`${AUTH_SERVICE_URL}/api/auth/me`, {
      headers: { Authorization: req.headers.authorization || '' }
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
