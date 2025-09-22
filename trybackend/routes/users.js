const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/yourdbname");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection FAILED:', error.message);
    process.exit(1);
  }
};

mongoose.Schema({
  name: String,
  username: String,
  category: String
})

module.exports = connectDB;
