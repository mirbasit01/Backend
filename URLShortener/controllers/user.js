
const User = require("../models/user");


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





const handleGetAlluser = async (req, res) => {
    const allUsers = await User.find({});
    return res.json(allUsers);
}

const handleGetUserById = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "No user found" });
    return res.json(user);
}

const handleDeletuser = async (req, res) => {
  const user =  await User.findByIdAndDelete(req.params.id);
  if(!user) return res.return(404).json({error: "No user found"});
  return res.json({message: "User deleted successfully"});

}

module.exports = {
    hadleuserRegister,
    handleGetAlluser,
    handleGetUserById,
    handleDeletuser

}