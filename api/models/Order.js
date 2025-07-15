const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  customerEmail: String,
  products: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      quantity: Number,
      price: Number,
      img: String
    }
  ],
  total: Number,
  paymentMethod: String,
  address: String,
  preferredDate: String,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema, 'Orders');
