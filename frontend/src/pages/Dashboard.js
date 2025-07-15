import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './Dashboard.css';
import API_BASE_URL from '../api';

function Dashboard() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products', err));
  }, []);

  const getQuantity = (_id) => {
    const item = cart.find(i => i._id === _id);
    return item ? item.quantity || 1 : 0;
  };

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || p.category === selectedCategory)
  );

  return (
    <div className="homepage-container">
      {/* ✅ Scrollable Banner Row on Small Screens */}
      <div className="hero-banner-scroll">
        <div className="hero-banner-row">
          <img src={require('../images/banner2.jpg')} alt="Banner Left" className="side-banner-img" />
          <div className="hero-main-banner">
            <img src={require('../images/banner1.jpg')} alt="Main Banner" className="main-banner-img" />
          </div>
          <img src={require('../images/banner3.jpg')} alt="Banner Right" className="side-banner-img" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-menu">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-button ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="filters">
        <input
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products..."
        />
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filtered.map(p => {
          const qty = getQuantity(p._id);
          return (
            <div className="product-card" key={p._id}>
              <img src={require(`../images/${p.img}`)} alt={p.name} className="product-img" />
              <h3>{p.name}</h3>
              <p>{p.weight} kg</p>
              <p>₹{p.price}</p>
              <div className="quantity-controls">
                <button onClick={() => removeFromCart(p)} disabled={qty === 0}>-</button>
                <span>{qty}</span>
                <button onClick={() => addToCart(p)}>+</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
