const express = require('express');
const router = express.Router();
const { hadleGenerateShortUrl, hadleAnalytics } = require("../controllers/url")

router.post('/' , hadleGenerateShortUrl)

router.get('/analytics/:shortId', hadleAnalytics);


z

module.exports = router;