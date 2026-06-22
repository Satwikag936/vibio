import express from 'express';
import multer from 'multer';
import Video from '../models/video.js';
import Channel from '../models/channel.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// store videos locally in /uploads
const upload = multer({ dest: 'uploads/' });

// upload a video
router.post('/upload', authMiddleware, upload.single('video'), async (req, res) => {
  try {
    const { title, description, channelId } = req.body;
    const channel = await Channel.findById(channelId);
    if (!channel) return res.status(404).json({ message: 'Channel not found' });

    const video = await Video.create({
      title,
      description,
      videoUrl: `/uploads/${req.file.filename}`,
      channel: channel._id
    });

    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// search videos by title or channel
router.get('/search', async (req, res) => {
  const q = req.query.q || '';
  try {
    const matchingChannels = await Channel.find({
      name: { $regex: q, $options: 'i' }
    });
    const channelIds = matchingChannels.map(ch => ch._id);

    const videos = await Video.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { channel: { $in: channelIds } }
      ]
    }).populate('channel');

    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ get all videos (new)
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('channel')
      .sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
