import express from 'express';
import multer from 'multer';
import path from 'path';
import Channel from '../models/channel.js';
import Video from '../models/video.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// configure multer to save directly into backend/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // just "uploads" folder at backend root
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST /api/create-channel-and-upload
router.post('/', authMiddleware, upload.single('video'), async (req, res) => {
  try {
    const { channelName, title, description } = req.body;

    // find or create channel
    let channel = await Channel.findOne({ owner: req.user.id });
    if (!channel) {
      // create new channel if not existing
      channel = await Channel.create({ name: channelName, owner: req.user.id });
    }

    // create video record
    const video = await Video.create({
      title,
      description,
      videoUrl: '/uploads/' + req.file.filename, // direct upload path
      channel: channel._id
    });

    res.json({ message: 'Channel & video saved successfully', channel, video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
