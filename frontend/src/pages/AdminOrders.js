import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminOrders.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchPhone, setSearchPhone] = useState('');
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('https://ricestore-ewyq.onrender.com/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Error fetching orders:', err));
  };

  const markAsDelivered = async (id) => {
    setLoadingId(id);
    try {
      await axios.put(`https://ricestore-ewyq.onrender.com/api/orders/${id}/delivered`);
      fetchOrders();
    } catch (err) {
      console.error('❌ Error updating order:', err);
      alert('Failed to update status');
    } finally {
      setLoadingId(null);
    }
  };

  const filteredOrders = orders.filter(order => {
    const phoneMatch = searchPhone.trim() === '' || order.phone.includes(searchPhone.trim());
    const statusMatch = filter === 'All' || order.status === filter;
    return phoneMatch && statusMatch;
  });

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <h2 className="text-xl font-bold">📦 Orders</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Search phone..."
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            className="search-input"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <p>No matching orders.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredOrders.map(order => (
            <div key={order._id} className="order-card">
              <p><strong>Customer:</strong> {order.customerName}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Date:</strong> {order.preferredDate || 'Not set'}</p>
              <p><strong>Items:</strong></p>
              <ul className="list-disc list-inside">
                {order.products.map((p, i) => (
                  <li key={i}>{p.name} - {p.quantity} pcs</li>
                ))}
              </ul>

              {order.status !== 'Delivered' && (
                <button
                  className="deliver-btn"
                  onClick={() => markAsDelivered(order._id)}
                  disabled={loadingId === order._id}
                >
                  {loadingId === order._id ? 'Updating...' : '✅ Mark as Delivered'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
