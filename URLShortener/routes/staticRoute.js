const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const { hadleuserRegister } = require('../controllers/user');
const { restrictTo } = require('../middleware/auth');


router.get('/admin/urls',restrictTo(['ADMIN']), async (req, res) => {
     const allUrls = await URL.find({});
    res.render('home', {
        urls: allUrls
    });
});
 
router.get('/',restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
     const allUrls = await URL.find({});
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