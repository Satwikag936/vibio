// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../utils/home.css';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/videos');
        const videosWithStats = await Promise.all(
          res.data.map(async (v) => {
            const statsRes = await axios.get(`http://localhost:5000/api/video-stats/${v._id}`);
            return { ...v, stats: statsRes.data || { likes: [], unlikes: [], shares: 0 } };
          })
        );
        setVideos(videosWithStats);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, []);

  const searchVideos = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/videos/search?q=${encodeURIComponent(searchQuery)}`
      );
      const videosWithStats = await Promise.all(
        res.data.map(async (v) => {
          const statsRes = await axios.get(`http://localhost:5000/api/video-stats/${v._id}`);
          return { ...v, stats: statsRes.data || { likes: [], unlikes: [], shares: 0 } };
        })
      );
      setVideos(videosWithStats);
    } catch (err) {
      console.error(err);
    }
  };

  // Minimal changes here: just update the counts locally first
  const handleLike = async (videoId) => {
    if (!user) return alert('Please log in to like videos.');

    setVideos((prev) =>
      prev.map((v) => {
        if (v._id === videoId) {
          const alreadyLiked = v.stats.likes?.includes(user._id);
          const newLikes = alreadyLiked
            ? v.stats.likes.filter((id) => id !== user._id)
            : [...(v.stats.likes || []), user._id];

          const newUnlikes = (v.stats.unlikes || []).filter((id) => id !== user._id);

          return { ...v, stats: { ...v.stats, likes: newLikes, unlikes: newUnlikes } };
        }
        return v;
      })
    );

    try {
      await axios.post(
        `http://localhost:5000/api/video-stats/${videoId}/like`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnlike = async (videoId) => {
    if (!user) return alert('Please log in to unlike videos.');

    setVideos((prev) =>
      prev.map((v) => {
        if (v._id === videoId) {
          const alreadyUnliked = v.stats.unlikes?.includes(user._id);
          const newUnlikes = alreadyUnliked
            ? v.stats.unlikes.filter((id) => id !== user._id)
            : [...(v.stats.unlikes || []), user._id];

          const newLikes = (v.stats.likes || []).filter((id) => id !== user._id);

          return { ...v, stats: { ...v.stats, likes: newLikes, unlikes: newUnlikes } };
        }
        return v;
      })
    );

    try {
      await axios.post(
        `http://localhost:5000/api/video-stats/${videoId}/unlike`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async (videoId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/video-stats/${videoId}/share`);
      setVideos((prev) =>
        prev.map((v) => (v._id === videoId ? { ...v, stats: res.data } : v))
      );
      navigator.clipboard.writeText(`${window.location.origin}/video/${videoId}`);
      alert('Video link copied to clipboard!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home-container">
      <header className="topbar">
        <div className="logo" onClick={() => navigate('/home')}>Vibio</div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchVideos()}
          />
          <button onClick={searchVideos}>🔍</button>
        </div>

        <div className="topbar-right">
          <button
            className="create-channel-btn"
            onClick={() => navigate('/create-channel')}
          >
            + Create Channel
          </button>
          <div
            className="profile-circle"
            onClick={() => navigate('/profile')}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </header>

      <main className="video-grid">
        {videos.length === 0 && (
          <p className="no-videos">No videos found. Upload or search above!</p>
        )}
        {videos.map((v) => (
          <div key={v._id} className="video-card">
            <video
              src={`http://localhost:5000${v.videoUrl}`}
              controls
              className="video-player"
            />
           <div className="video-info">
 
 
  <span className="   channel-name">{  v.channel?.name}</span>
   <h3 className="video-title">{v.title}</h3>
    <p className="video-description">{v.description}</p>
</div>

            <div className="video-actions">
             {/* <button onClick={() => handleLike(v._id)}> */}
                {/* 👍 {v.stats.likes?.length || 0} */}
              {/* </button> */}
              {/* <button onClick={() => handleUnlike(v._id)}> */}
                {/* 👎 {v.stats.unlikes?.length || 0} */}
              {/* </button> */}
              <button onClick={() => handleShare(v._id)}>
                🔗 Share ({v.stats.shares || 0})
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
