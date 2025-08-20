// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db'); // DB connection file
// const postRoutes = require('./routes/postRoutes');

// dotenv.config(); // Load environment variables

// const app = express();

// //  Middleware to parse JSON request bodies
// app.use(express.json());

// //  Connect to MongoDB
// connectDB();

// // Route setup — register API
// app.use('/api/auth', require('./routes/authRoutes')); // Mount auth routes

// // Optional test route
// app.get('/', (req, res) => { 
//   res.send('Server is running and connected to MongoDB!');
// });

// app.use(express.json()); // Make sure this is there
// app.use('/api/posts', postRoutes);
   
// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const metadataRoutes = require('./routes/metadataRoutes');
const cors = require('cors');   // <-- add this

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/metadataDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/metadata', metadataRoutes);

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
