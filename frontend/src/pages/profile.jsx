import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../utils/profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [hasChannel, setHasChannel] = useState(false);
  const [channel, setChannel] = useState(null); // store channel info
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    if (!user) return;

    const checkChannel = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user-channel/${user._id}`
        );

        console.log("Channel check response:", res.data);

        if (res.data.hasChannel) {
          setHasChannel(true);
          setChannel(res.data.channel);
        } else {
          setHasChannel(false);
          setChannel(null);
        }
      } catch (err) {
        console.error(err);
        setHasChannel(false);
        setChannel(null);
      } finally {
        setLoading(false);
      }
    };

    checkChannel();
  }, [user]);

  if (!user) {
    return (
      <div className="profile-page">
        <p>No user found. Please login.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-page">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Circle showing first letter */}
        <div className="profile-avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>

        {/* Name and email */}
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>

        {/* Has channel info */}
        <p className="profile-channel">
          Has Channel: {hasChannel ? 'Yes' : 'No'}
        </p>

        {/* Show channel name if exists */}
        {hasChannel && channel && (
          <p className="profile-channel-name">Channel: {channel.name}</p>
        )}

        {/* Upload button if channel exists */}
        {hasChannel && (
          <button
            className="upload-btn"
            onClick={() => navigate('/upload')}
          >
            Upload Another Video
          </button>
        )}
      </div>
    </div>
  );
}
