const express = require('express');
const router = express.Router();
const { hadleuserRegister, hadleuserLogin } = require("../controllers/user")




router.post('/', hadleuserRegister)
router.post('/login', hadleuserLogin)


module.exports = router;