import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (phone === '7671879837' && password === 'rayapudi_08') {
      const admin = {
        id: 'admin123',
        name: 'Admin',
        phone,
        role: 'admin',
        email: 'admin@example.com'
      };

      login('admin_token', admin);
      navigate('/admin');
      return;
    }

    try {
      const res = await axios.post('https://ricestore-ewyq.onrender.com/api/auth/login', { phone, password });
      const { token, user } = res.data;

      login(token, user);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('❌ Invalid phone or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="[0-9]{10}"
            maxLength={10}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <small className="error">{error}</small>}
          <button type="submit">Login</button>
        </form>
        <p className="reg-link">
          New User? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
