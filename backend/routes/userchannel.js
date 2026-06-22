import express from 'express';
import Channel from '../models/channel.js';
import { authMiddleware } from '../middleware/auth.js'; // make sure this exists

const router = express.Router();

/**
 * GET /api/user-channel/me
 * Get the logged-in user’s channel info (JWT required)
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.user.id });
    if (!channel) {
      return res.json({ hasChannel: false });
    }
    res.json({ hasChannel: true, channel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/user-channel/:userId
 * Public – get a user’s channel by user id
 */
router.get('/:userId', async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.params.userId });
    if (!channel) {
      return res.json({ hasChannel: false });
    }
    res.json({ hasChannel: true, channel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
