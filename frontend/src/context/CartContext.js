import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 🔑 Unique key per user
  const getUserKey = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.email || 'guest';
  };

  const getStorageKey = () => `cart-${getUserKey()}`;
  const getExpiryKey = () => `cart-expiry-${getUserKey()}`;

  // 🧠 Load cart from localStorage on first render
  useEffect(() => {
    const key = getStorageKey();
    const expiryKey = getExpiryKey();
    const expiry = localStorage.getItem(expiryKey);

    if (expiry && new Date().getTime() > parseInt(expiry)) {
      // Cart expired
      localStorage.removeItem(key);
      localStorage.removeItem(expiryKey);
      setCart([]);
    } else {
      const storedCart = JSON.parse(localStorage.getItem(key)) || [];
      setCart(storedCart);
    }
  }, []);

  // 💾 Save cart to localStorage when it changes
  useEffect(() => {
    const key = getStorageKey();
    const expiryKey = getExpiryKey();

    if (cart.length > 0) {
      localStorage.setItem(key, JSON.stringify(cart));
      const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
      localStorage.setItem(expiryKey, expiryTime.toString());
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prev.filter((item) => item._id !== product._id);
      }
    });
  };

  const updateQuantity = (product, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === product._id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    const key = getStorageKey();
    const expiryKey = getExpiryKey();
    localStorage.removeItem(key);
    localStorage.removeItem(expiryKey);
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
