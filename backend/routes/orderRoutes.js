const express = require('express');
const Order = require('../models/Order');
const { sendEmailToAdmin, sendEmailToCustomer, sendDeliveryEmail } = require('../utils/sendEmail');

const router = express.Router();
// ✅ Create Order
// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, address, products = [], paymentMethod, customerEmail, preferredDate } = req.body;

    const total = products.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      customerName,
      phone,
      address,
      preferredDate,
      products,
      paymentMethod,
      total,
      customerEmail
    });

    console.log('✅ Order saved:', order._id);

    // Respond immediately
    res.status(201).json({ message: 'Order placed', order });

    // 🔄 Run notifications in background (no await)
    sendEmailToAdmin(order).catch(console.error);
    sendEmailToCustomer(order).catch(console.error);

  } catch (err) {
    console.error('❌ Error placing order:', err);
    res.status(500).json({ error: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('❌ Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


// ✅ Update Delivery Status
router.put('/:id/delivered', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, {
      status: 'Delivered',
      deliveryDate: new Date()
    }, { new: true });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    await sendDeliveryEmail(order);

    res.json({ message: 'Marked as delivered', order });

  } catch (err) {
    console.error('❌ Error updating status:', err.message);
    res.status(500).json({ error: err.message });
  }
});
// Get orders by phone number
router.get('/phone/:phone', async (req, res) => {
  try {
      console.log('📞 Fetching orders for:', req.params.phone); // Add this line

    const orders = await Order.find({ phone: req.params.phone }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});



module.exports = router;
