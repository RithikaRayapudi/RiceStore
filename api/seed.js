// seed.js
const mongoose = require('mongoose');
const Product = require('./models/Product'); 

const MONGODB_URI = 'mongodb+srv://riceadmin:riceadmin@ricestore.asqqvko.mongodb.net/Rice_Store?retryWrites=true&w=majority&appName=RiceStore'; // 🔁 Replace with your real URI

const products = [
  { name: "Chandana Premium JSR Lachkari Kolam Rice", weight: "26", price: "1700", img: "1.jpg", category: "JSR" },
  { name: "Gajraj Sona Masoori", weight: "25", price: "1250", img: "2.jpg", category: "Sona Masoori" },
  { name: "Bell Brand HMT Rice", weight: "26", price: "1600", img: "3.jpg", category: "HMT" },
  { name: "Surya Teja HMT Rice", weight: "25", price: "1450", img: "4.jpg", category: "HMT" },
  { name: "Joker Brand JSR Rice", weight: "25", price: "1450", img: "5.jpg", category: "JSR" },
  { name: "Kisan Single Polish Rice", weight: "26", price: "1600", img: "6.jpg", category: "Polish" },
  { name: "Cow HMT Rice", weight: "25", price: "1450", img: "7.jpg", category: "HMT" },
  { name: "Mahateja HMT Rice", weight: "25", price: "1450", img: "8.jpg", category: "HMT" },
  { name: "Yes Boss Kurnool Sona Masoori Rice", weight: "26", price: "1400", img: "9.jpg", category: "Sona Masoori" },
  { name: "Yes Boss JSR Lachkari Kolam Rice", weight: "26", price: "1800", img: "10.jpg", category: "JSR" },
  { name: "Chandana HMT Rice", weight: "26", price: "1600", img: "11.jpg", category: "HMT" },
  { name: "Chandana JSR Raw Rice - 2 years old", weight: "26", price: "2000", img: "12.jpg", category: "JSR" },
  { name: "Kurnool Sona Masoori Raw Rice- 1 year old", weight: "25", price: "1500", img: "13.jpg", category: "Sona Masoori" },
  { name: "Mughal Badshah xxxL Premium Basmati Rice", weight: "26", price: "120 per kg", img: "14.jpg", category: "Basmati" },
  { name: "Vajrateja HMT Jeera Rice", weight: "26", price: "1500", img: "15.jpg", category: "HMT" },
  { name: "Gajraj HMT Rice", weight: "25", price: "1400", img: "16.jpg", category: "HMT" },
  { name: "All Seasons xxxL Basmati Rice", weight: "26", price: "120 pe kg", img: "17.jpg", category: "Basmati" },
  { name: "Madhuram HMT Rice", weight: "26", price: "1500", img: "18.jpg", category: "HMT" },
  { name: "Vajrateja HMT Rice", weight: "26", price: "1600", img: "19.jpg", category: "HMT" },
  { name: "Vaishnavi HMT Rice", weight: "25", price: "1350", img: "20.jpg", category: "HMT" },
  { name: "RL JSR Rice", weight: "25", price: "1500", img: "21.jpg", category: "JSR" },
  { name: "KR Brand HMT Rice", weight: "25", price: "1450", img: "22.jpg", category: "HMT" },
];

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany(); 
    await Product.insertMany(products);
    console.log('🌾 Seeded products successfully');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
