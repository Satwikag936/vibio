import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../utils/signup.css'; // make sure this path is correct

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={submit} className="signup-card">
        <h2>Create Your Vibio Account</h2>
        <input name="name" placeholder="Name" onChange={change} className="input" />
        <input name="email" placeholder="Email" onChange={change} className="input" />
        <input name="password" type="password" placeholder="Password" onChange={change} className="input" />
        <button className="signup-btn">Sign Up</button>
        <p className="small-text">Already have an account? Login instead.</p>
      </form>
    </div>
  );
}
