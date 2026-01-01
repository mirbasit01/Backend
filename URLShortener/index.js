require('dotenv').config();
const express = require('express');
const app = express();
const { connectDB } = require('./connection');

const PORT = 8000;

// connect to database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/URLShortener';

connectDB(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });

const urlRoute = require("./routes/url")

app.use('/url' , urlRoute)

app.listen(PORT , () => console.log(`Server is running on port ${PORT}`));