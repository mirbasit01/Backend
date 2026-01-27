const { Router } = require('express');
const User = require('../models/user');
const router = Router();


router.get('/signin', (req, res) => {
    return res.render('signin')
})

router.get('/signup', (req, res) => {
    return res.render('signup')
})
 
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log("token :", token );
    return res.cookie('token', token).redirect('/');
  } catch (error) {
    console.log(error)
    return res.render('signin', {
      error: error.message
    });
  }
});



router.post('/signup', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        await User.create({
            fullname,
            email,
            password
        });
        return res.redirect('/');
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ error: error.message });
    }
})



module.exports = router;