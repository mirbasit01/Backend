const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const { hadleuserRegister } = require('../controllers/user');
 
router.get('/', async (req, res) => {
    if (!req.user) return res.redirect('/login');
    const allUrls = await URL.find({createdBy: req.user._id });
    res.render('home', {
        urls: allUrls
    });
});

router.get('/signup' , (req, res) => {
    return res.render('signup')
})
router.get('/login' , (req, res) => {
    return res.render('login')
})

router.post('/signup', hadleuserRegister);

module.exports = router;