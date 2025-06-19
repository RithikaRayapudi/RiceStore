// src/App.js
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar'; // ⬅️ import
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AdminOrders from './pages/AdminOrders';
import AdminProducts from './pages/AdminProducts';

function App() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin') && user?.role === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Conditionally render navbars */}
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}

      <main className="flex-1 px-4 py-6 md:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route path="/admin" element={token && user?.role === 'admin' ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/admin/orders" element={token && user?.role === 'admin' ? <AdminOrders /> : <Navigate to="/login" />} />
          <Route path="/admin/products" element={token && user?.role === 'admin' ? <AdminProducts /> : <Navigate to="/login" />} />

          {/* User Routes */}
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/cart" element={token ? <Cart /> : <Navigate to="/login" />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
