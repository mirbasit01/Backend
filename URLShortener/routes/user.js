const express = require('express');
const router = express.Router();
const { hadleuserRegister, handleGetAlluser, handleGetUserById, handleDeletuser } = require("../controllers/user")




router.post('/', hadleuserRegister)
router.get('/', handleGetAlluser)
router.get('/:id', handleGetUserById)
router.delete('/:id', handleDeletuser)



module.exports = router;