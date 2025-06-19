import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Admin.css'; 

function Admin() {
  const user = JSON.parse(localStorage.getItem('user'));

  // 🔐 Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Admin Dashboard</h2>
      <ul className="admin-links">
        <li>
          <Link to="/admin/orders" className="admin-link">📦 View Orders</Link>
        </li>
        <li>
          <Link to="/admin/products" className="admin-link">📋 Manage Products</Link>
        </li>
      </ul>
    </div>
  );
}

export default Admin;
