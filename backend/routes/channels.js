import express from 'express';
import Channel from '../models/channel.js';
import { authMiddleware } from '../middleware/auth.js'; // JWT middleware

const router = express.Router();

// Create a channel
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Channel.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Channel name already exists' });

    const channel = await Channel.create({ name, owner: req.user.id });
    res.json(channel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
