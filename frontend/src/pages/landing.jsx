import { Link } from 'react-router-dom';
import '../utils/landing.css';   // add this import

export default function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-logo">
        <div className="landing-v">V</div>
      </div>
      <h1 className="landing-title">Vibio</h1>
      <p className="landing-subtitle">A Video Streaming Platform</p>

      <div className="landing-buttons">
        <Link to="/signup" className="landing-btn signup">Sign Up</Link>
        <Link to="/login" className="landing-btn login">Login</Link>
      </div>
    </div>
  );
}
