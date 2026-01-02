const express = require('express');
const router = express.Router();
const { hadleuserRegister} = require("../controllers/user")


router.post('/' , hadleuserRegister)
 

module.exports = router;