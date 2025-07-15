import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const getUserKey = useCallback(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.email || 'guest';
  }, []);

  const getStorageKey = useCallback(() => `cart-${getUserKey()}`, [getUserKey]);
  const getExpiryKey = useCallback(() => `cart-expiry-${getUserKey()}`, [getUserKey]);

  useEffect(() => {
    const key = getStorageKey();
    const expiryKey = getExpiryKey();
    const expiry = localStorage.getItem(expiryKey);

    if (expiry && new Date().getTime() > parseInt(expiry)) {
      localStorage.removeItem(key);
      localStorage.removeItem(expiryKey);
      setCart([]);
    } else {
      const storedCart = JSON.parse(localStorage.getItem(key)) || [];
      setCart(storedCart);
    }
  }, [getStorageKey, getExpiryKey]);

  useEffect(() => {
    const key = getStorageKey();
    const expiryKey = getExpiryKey();

    if (cart.length > 0) {
      localStorage.setItem(key, JSON.stringify(cart));
      const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
      localStorage.setItem(expiryKey, expiryTime.toString());
    }
  }, [cart, getStorageKey, getExpiryKey]);

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
