const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const { hadleuserRegister } = require('../controllers/user');
 
router.get('/', async (req, res) => {
    const allUrls = await URL.find({});
    res.render('home', {
        urls: allUrls
    });
});

router.get('/signup' , (req, res) => {
    return res.render('signup')
})

router.post('/signup', hadleuserRegister);

module.exports = router;