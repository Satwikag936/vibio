// backend/models/videoStats.js
import mongoose from 'mongoose';

const videoStatsSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true, unique: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  unlikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  shares: { type: Number, default: 0 }
}, { timestamps: true });

const VideoStats = mongoose.model('VideoStats', videoStatsSchema);
export default VideoStats;
