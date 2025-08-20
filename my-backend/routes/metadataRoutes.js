
const express = require("express");
const Metadata = require("../models/metadataModel");
const router = express.Router();

// 1️⃣ POST API - create metadata
router.post("/create", async (req, res) => {
  try {
    const newMetadata = new Metadata(req.body);
    await newMetadata.save();
    res.status(201).json({ success: true, data: newMetadata });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2️⃣ GET API - fetch all metadata
router.get("/all", async (req, res) => {
  try {
    const allMetadata = await Metadata.find();
    res.json({ success: true, data: allMetadata });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
