import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Signup from './pages/signup';
import Login from './pages/login';
import Upload from './pages/upload';
import Home from './pages/home';
import Watch from './pages/watch';
import Navbar from './components/navbar';
import CreateChannel from './pages/createchannel';
import Profile from './pages/profile';
import Settings from './pages/settings';


function App() {
  return (
    <Router>
      {/* If you want Navbar globally, uncomment this: */}
      {/* <Navbar /> */}

      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Video upload / channel */}
        <Route path="/upload" element={<Upload />} />
        <Route path="/create-channel" element={<CreateChannel />} />

        {/* After login dashboard */}
        <Route path="/home" element={<Home />} />

        {/* Watch single video */}
        <Route path="/watch/:id" element={<Watch />} />
     
        {/* NEW routes for sidebar items */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      
     
      </Routes>
    </Router>
  );
}

export default App;
