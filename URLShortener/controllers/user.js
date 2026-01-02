
const User = require("../models/user");


const hadleuserRegister = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.create({ name, email, password });
    console.log(body)
    console.log(existingUser);
    return res.render('home', { user: existingUser })
   
}
module.exports = { hadleuserRegister }