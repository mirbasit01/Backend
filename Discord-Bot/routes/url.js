const express = require('express');
const router = express.Router();
const { hadleGenerateShortUrlForBot,  } = require("../controllers/url")

router.post('/' , hadleGenerateShortUrlForBot)

 



module.exports = router;