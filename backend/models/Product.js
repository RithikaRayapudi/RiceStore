
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  weight: String,
  price: String,
  img: String,
  category: String
});

module.exports = mongoose.model('Product', productSchema);
