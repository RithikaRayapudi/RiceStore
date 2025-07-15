import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'leaflet/dist/leaflet.css';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // ✅ Add this

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Wrap with AuthProvider first */}
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
