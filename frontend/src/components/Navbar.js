import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { isLoggedIn, logout, user } = useAuth();

  const handleLogout = () => {
    // Remove cart associated with user
    if (user?.email) {
      localStorage.removeItem(`cart_${user.email}`);
    }

    logout();
    clearCart();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo"><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Chandana Rice Stores</Link>
</div>

      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>About us</Link>
        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>Cart</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
          </>
        ) : (
          <button
            className="logout-btn"
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
