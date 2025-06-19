import React, { useState } from 'react';
import './Cart.css';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, clearCart, updateQuantity } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    preferredDate: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const getTotal = () =>
    cart
      .reduce((total, item) => {
        const price = parseFloat(item.price.toString().replace(/[^\d.]/g, ''));
        return total + price * (item.quantity || 1);
      }, 0)
      .toFixed(2);

  const getTotalItems = () =>
    cart.reduce((count, item) => count + (item.quantity || 1), 0);

  const validate = () => {
    const newErrors = {};
    if (!customer.name.trim()) newErrors.name = 'Name is required';
    if (!/^\d{10}$/.test(customer.phone))
      newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!/^\S+@gmail\.com$/.test(customer.email))
      newErrors.email = 'Only Gmail addresses are accepted';
    if (!customer.address.trim()) newErrors.address = 'Address is required';
    return newErrors;
  };

  const handlePlaceOrder = async () => {
    const validationErrors = validate();
    if (!cart.length) return alert('🛒 Your cart is empty.');
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post('https://ricestore-ewyq.onrender.com/api/orders', {
        customerName: customer.name,
        phone: customer.phone,
        address: customer.address,
        preferredDate: customer.preferredDate,
        products: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price),
          weight: item.weight,
        })),
        paymentMethod,
        customerEmail: customer.email,
        total: parseFloat(getTotal()),
      });

      clearCart();

      const user = JSON.parse(localStorage.getItem('user'));
      const userKey = user?.email || 'guest';
      localStorage.removeItem(`cart-${userKey}`);
      localStorage.removeItem(`cart-expiry-${userKey}`);

      alert('✅ Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Order error:', error);
      alert('❌ Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        <div className="checkout-content">
          <div className="cart-items-section">
            {cart.map((item) => (
              <div className="cart-item-card" key={item._id}>
                <img
                  src={require(`../images/${item.img}`)}
                  alt={item.name}
                  className="cart-item-img"
                />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.weight} kg</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        updateQuantity(item, Math.max((item.quantity || 1) - 1, 1))
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item, (item.quantity || 1) + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-item-price">
                    ₹{(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-form-section">
            <h3>Delivery Information</h3>

            <input
              name="name"
              placeholder="Your Name"
              value={customer.name}
              onChange={handleChange}
              required
            />
            {errors.name && <small className="error">{errors.name}</small>}

            <input
              name="phone"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <small className="error">{errors.phone}</small>}

            <input
              name="email"
              placeholder="Your Gmail"
              value={customer.email}
              onChange={handleChange}
              required
            />
            {errors.email && <small className="error">{errors.email}</small>}

            <textarea
              name="address"
              placeholder="Delivery Address"
              value={customer.address}
              onChange={handleChange}
              required
            />
            {errors.address && <small className="error">{errors.address}</small>}

            <label>
              Preferred Delivery Date:
              <input
                type="date"
                name="preferredDate"
                value={customer.preferredDate}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="payment-method" style={{ marginTop: '1rem', fontWeight: 'bold' }}>
              Payment Method
            </label>
            <select
              id="payment-method"
              className="payment-select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
            </select>

            {paymentMethod === 'UPI' && (
              <div className="upi-section">
                <p>Scan the QR to pay:</p>
                <img
                  src={require('../images/upi.jpg')}
                  alt="UPI QR"
                  className="upi-qr-img"
                />
              </div>
            )}

            <div className="checkout-summary">
              <p>Total Items: {getTotalItems()}</p>
              <p>Total Price: ₹{getTotal()}</p>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="order-button"
            >
              {isSubmitting ? 'Placing Order...' : '🛍 Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
