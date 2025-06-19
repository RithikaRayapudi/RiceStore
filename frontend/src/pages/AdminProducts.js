import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminProducts.css';

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleUpdate = async (id, price, weight) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, { price, weight });
      alert('✅ Updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('❌ Update failed');
    }
  };

  return (
    <div className="admin-products">
      <h2 className="admin-heading">📋 Edit Product Prices</h2>
      {products.map(p => (
        <div key={p._id} className="product-card">
          <p className="product-name"><strong>{p.name}</strong></p>
          <div className="input-row">
            <div className="product-input-group">
              <label htmlFor={`price-${p._id}`}>Price ₹</label>
              <input
                id={`price-${p._id}`}
                type="number"
                defaultValue={p.price}
                onBlur={(e) => handleUpdate(p._id, e.target.value, p.weight)}
              />
            </div>
            <div className="product-input-group">
              <label htmlFor={`weight-${p._id}`}>Weight (kg)</label>
              <input
                id={`weight-${p._id}`}
                type="number"
                defaultValue={p.weight}
                onBlur={(e) => handleUpdate(p._id, p.price, e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;
