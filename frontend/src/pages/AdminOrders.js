import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchPhone, setSearchPhone] = useState('');
  const [filter, setFilter] = useState('All');

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || '';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get(`${API_BASE_URL}/orders`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          console.error('Expected an array but got:', res.data);
          setOrders([]); // fallback to empty list
        }
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        setOrders([]); // ensure orders is always an array
      });
  };

  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) => {
        const phoneMatch =
          searchPhone.trim() === '' ||
          order.phone?.includes(searchPhone.trim());
        const statusMatch = filter === 'All' || order.status === filter;
        return phoneMatch && statusMatch;
      })
    : [];

  return (
    <div>
      <h2>Admin Orders</h2>

      <div>
        <input
          type="text"
          placeholder="Search by phone"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Phone</th>
            <th>Status</th>
            {/* Add more columns if needed */}
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.phone}</td>
              <td>{order.status}</td>
              {/* Render more details if needed */}
            </tr>
          ))}
        </tbody>
      </table>

      {filteredOrders.length === 0 && <p>No orders found.</p>}
    </div>
  );
};

export default AdminOrders;
