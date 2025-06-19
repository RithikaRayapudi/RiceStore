import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const phone = user?.phone;

    if (!phone) {
      setLoading(false);
      return;
    }

    axios.get(`${API_BASE_URL}/orders/phone/${phone}`)
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (orders.length === 0) return <div>No orders yet.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <div className="space-y-4">
        {orders.map((order, i) => (
          <div key={i} className="p-4 border rounded shadow-sm bg-white">
            <p className="font-semibold">Status: {order.status}</p>
            <p>Payment: {order.paymentMethod}</p>
            <p>Address: {order.address}</p>
            <p>Preferred Date: {order.preferredDate}</p>
            <p>Total: ₹{order.total}</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {order.products.map((p, idx) => (
                <div key={idx} className="flex items-center gap-2 border p-2 rounded">
                  {p.img && (
                    <img
                      src={`/images/${p.img}`}
                      alt={p.name}
                      className="w-12 h-12 object-cover"
                    />
                  )}
                  <div>
                    <p>{p.name}</p>
                    <p>Qty: {p.quantity}</p>
                    <p>₹{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
