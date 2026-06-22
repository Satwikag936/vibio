// src/components/Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'; // CSS for sidebar

export default function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <aside className="sidebar">
      {/* Profile section */}
      <div
        className="sidebar-item sidebar-profile"
        onClick={() => navigate('/profile')}
      >
        <div className="avatar">{initial}</div>
        <span>Profile</span>
      </div>

      {/* Settings section */}
      <div
        className="sidebar-item"
        onClick={() => navigate('/settings')}
      >
        <i className="icon">⚙️</i>
        <span>Settings</span>
      </div>

      {/* Home section */}
      <div
        className="sidebar-item"
        onClick={() => navigate('/home')}
      >
        <i className="icon">🏠</i>
        <span>Home</span>
      </div>
    </aside>
  );
}
