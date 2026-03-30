import express from 'express';
import axios from 'axios';

const router = express.Router();
const DELIVERY_SERVICE_URL = process.env.DELIVERY_SERVICE_URL || 'http://localhost:3004';

router.post('/', async (req, res, next) => {
  try {
    const { data } = await axios.post(`${DELIVERY_SERVICE_URL}/api/deliveries`, req.body, {
      headers: { Authorization: req.headers.authorization || '' }
    });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/status', async (req, res, next) => {
  try {
    const { data } = await axios.put(
      `${DELIVERY_SERVICE_URL}/api/deliveries/${req.params.id}/status`,
      req.body,
      { headers: { Authorization: req.headers.authorization || '' } }
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { data } = await axios.get(`${DELIVERY_SERVICE_URL}/api/deliveries/${req.params.id}`, {
      headers: { Authorization: req.headers.authorization || '' }
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
