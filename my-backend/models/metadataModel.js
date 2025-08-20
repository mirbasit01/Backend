
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
