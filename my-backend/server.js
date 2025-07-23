// // // // const express = require('express');
// // // // const dotenv = require('dotenv');
// // // // const connectDB = require('./config/db');

// // // // dotenv.config();
// // // // const app = express();

// // // // // Connect to DB
// // // // connectDB();

// // // // // Middleware
// // // // app.use(express.json());

// // // // // Routes
// // // // app.use('/api/auth', require('./routes/authRoutes'));

// // // // // Start server
// // // // const PORT = process.env.PORT || 3000;
// // // // app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// // // const express = require('express');
// // // const app = express();

// // // app.get('/', (req, res) => {
// // //   res.send('Server is running!');
// // // });

// // // app.listen(3000, () => {
// // //   console.log('Server running on http://localhost:3000');
// // // });

// // const express = require('express');
// // const { MongoClient } = require('mongodb');
// // const dotenv = require('dotenv');
// // require('dotenv').config();

// // dotenv.config();
// // const app = express();

// // app.use(express.json()); // middleware to parse JSON

// // // MongoDB client
// // const client = new MongoClient(process.env.MONGO_URI);
// // let db;

// // // Connect to DB
// // async function connectDB() {
// //   try {
// //     await client.connect();
// //     db = client.db('testDB');
// //     console.log("✅ Connected to MongoDB");
// //   } catch (err) {
// //     console.error("❌ MongoDB connection error:", err);
// //   }
// // }
// // connectDB();

// // // API Routes
// // app.get('/', (req, res) => {
// //   res.send('🚀 Server is running!');
// // });

// // // Example GET: Get users from collection
// // app.get('/api/users', async (req, res) => {
// //   try {
// //     const users = await db.collection('users').find().toArray();
// //     res.json(users);
// //   } catch (err) {
// //     res.status(500).json({ message: "Error fetching users", error: err.message });
// //   }
// // });

// // // Example POST: Add a user
// // app.post('/api/users', async (req, res) => {
// //   const { name, email } = req.body;
// //   try {
// //     const result = await db.collection('users').insertOne({ name, email });
// //     res.status(201).json({ message: "User added", userId: result.insertedId });
// //   } catch (err) {
// //     res.status(500).json({ message: "Error adding user", error: err.message });
// //   }
// // });

// // // Start server
// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => console.log(`🌐 Server running on http://localhost:${PORT}`));
// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db'); // ✅ use this line

// dotenv.config(); // ✅ load .env variables

// const app = express();

// connectDB(); // ✅ connect to MongoDB

// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db'); // 👈 your db connection file

// dotenv.config(); // ✅ load .env before using process.env

// const app = express();

// // Connect to MongoDB
// connectDB();

// app.get('/', (req, res) => {
//   res.send('Server is running and connected to MongoDB!');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // DB connection file

dotenv.config(); // Load environment variables

const app = express();

// ✅ Middleware to parse JSON request bodies
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Route setup — register API
app.use('/api/auth', require('./routes/authRoutes')); // Mount auth routes

// Optional test route
app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
