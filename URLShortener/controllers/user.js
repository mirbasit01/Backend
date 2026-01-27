
const User = require("../models/user");
const {v4: uuidv4} = require('uuid')
const {setUser} = require('../service/auth')
const hadleuserRegister = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = await User.create({ name, email, password });
        const URL = require('../models/url');
        const allUrls = await URL.find({});
        console.log(newUser, ' newUser')
        return res.render('home', { user: newUser });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Registration failed' });
    }
}


const hadleuserLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password })
    console.log(user, ' : user form login ')
    if (!user) return res.render('login', { error: 'Invalid username or password' });
    const token = setUser(user)
    res.cookie('token', token, user)
    return res.redirect('/')

}







module.exports = {
    hadleuserRegister,
    hadleuserLogin

}