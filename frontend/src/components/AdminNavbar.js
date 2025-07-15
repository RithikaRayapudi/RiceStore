// src/components/AdminNavbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

function AdminNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (

    <nav className="navbar">
      <div className="logo">Admin Panel</div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/admin/orders">📦 Orders</Link>
        <Link to="/admin/products">📋 Products</Link>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
