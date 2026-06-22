import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import '../utils/login.css'; // import the CSS
import '../utils/login.css'; 
export default function Login() {
  const [form, setForm] = useState({ email:'', password:'' });
  const navigate = useNavigate();
  const change = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submit} className="login-card">
        <h2>Welcome Back to Vibio</h2>
        <input 
          name="email" 
          placeholder="Email" 
          onChange={change} 
          className="input" 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          onChange={change} 
          className="input" 
        />
        <button className="login-btn">Login</button>
      </form>
    </div>
  );
}
