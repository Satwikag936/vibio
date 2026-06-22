// backend/routes/videostats.js
import express from 'express';
import mongoose from 'mongoose';
import VideoStats from '../models/videostats.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const getUserId = (req) => req.user.id || req.user._id;

// GET video stats
const findStats = async (videoId) => {
  // Try finding by ObjectId first (for old records)
  if (mongoose.Types.ObjectId.isValid(videoId)) {
    let stats = await VideoStats.findOne({ videoId: mongoose.Types.ObjectId(videoId) });
    if (stats) return stats;
  }
  // Fallback: match as string
  return await VideoStats.findOne({ videoId });
};
router.get('/:videoId', async (req, res) => {
  try {
    const stats = await VideoStats.findOne({ videoId: req.params.videoId });
    res.json(stats || { likes: [], unlikes: [], shares: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LIKE
router.post('/:videoId/like', authMiddleware, async (req, res) => {
  try {
    //const userId = getUserId(req);
    const userId = mongoose.Types.ObjectId(req.user._id);
    let stats = await VideoStats.findOne({ videoId: req.params.videoId });
    if (!stats) {
      stats = new VideoStats({
        videoId: req.params.videoId,
        likes: [],
        unlikes: [],
        shares: 0
      });
    }

    // Remove from unlikes
    stats.unlikes = stats.unlikes.filter(id => id.toString() !== userId);

    // Add to likes
    if (!stats.likes.map(id => id.toString()).includes(userId)) {
      stats.likes.push(mongoose.Types.ObjectId(userId));
    }

    await stats.save();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UNLIKE
router.post('/:videoId/unlike', authMiddleware, async (req, res) => {
  try {
   // const userId = getUserId(req);
   const userId = mongoose.Types.ObjectId(req.user._id);
    let stats = await VideoStats.findOne({ videoId: req.params.videoId });
    if (!stats) {
      stats = new VideoStats({
        videoId: req.params.videoId,
        likes: [],
        unlikes: [],
        shares: 0
      });
    }

    // Remove from likes
    stats.likes = stats.likes.filter(id => id.toString() !== userId);

    // Add to unlikes
    if (!stats.unlikes.map(id => id.toString()).includes(userId)) {
      stats.unlikes.push(mongoose.Types.ObjectId(userId));
    }

    await stats.save();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SHARE
router.post('/:videoId/share', async (req, res) => {
  try {
    let stats = await VideoStats.findOne({ videoId: req.params.videoId });
    if (!stats) {
      stats = new VideoStats({
        videoId: req.params.videoId,
        likes: [],
        unlikes: [],
        shares: 0
      });
    }
    stats.shares += 1;
    await stats.save();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

