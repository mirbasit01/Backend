
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
