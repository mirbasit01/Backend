
const mongoose = require("mongoose");

const metadataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: String,
  image: String,
  attributes: [
    {
      trait_type: String,
      value: String,
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Metadata", metadataSchema);
// {
//   "name": "my-backend",
//   "version": "1.0.0",
//   "main": "server.js",
//   "scripts": {
//     "start": "node index.js",
//     "dev": "nodemon index.js"
//   },
//   "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "description": "",
//   "dependencies": {
//     "bcryptjs": "^3.0.2",
//     "cors": "^2.8.5",
//     "dotenv": "^17.2.0",
//     "express": "^5.1.0",
//     "jsonwebtoken": "^9.0.2",
//     "mongoose": "^8.16.4"
//   }
// }