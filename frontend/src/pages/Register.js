// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!/^[0-9]{10}$/.test(form.phone)) newErrors.phone = 'Phone must be 10 digits';
    // if (!/^[^\\s@]+@gmail\\.com$/.test(form.email)) newErrors.email = 'Email must be a valid Gmail address';
    if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        ...form,
        role: 'customer'
      });
      localStorage.setItem('user', JSON.stringify({ email: form.email }));
      alert('Registered successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          {errors.name && <small className="error">{errors.name}</small>}

          <input name="email" type="email" placeholder="Gmail" value={form.email} onChange={handleChange} required />
          {errors.email && <small className="error">{errors.email}</small>}

          <input name="phone" placeholder="Mobile Number" value={form.phone} onChange={handleChange} required />
          {errors.phone && <small className="error">{errors.phone}</small>}

          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          {errors.password && <small className="error">{errors.password}</small>}

          <button type="submit">Register</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
