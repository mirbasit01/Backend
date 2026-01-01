const express = require('express');
const router = express.Router();
const { hadleGenerateShortUrl } = require("../controllers/url")

router.post('/' , hadleGenerateShortUrl)

module.exports = router;