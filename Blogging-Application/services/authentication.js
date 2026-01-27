const jwt = require('jsonwebtoken');
const scretkey = '@basit@1323'


function createToken(user) {
    const payload = {
        _id : user._id,
        email: user.email,
        profileimgurl: user.profileimgurl,
        role: user.role
    }
    const token = jwt.sign(payload, scretkey);
    return token;
 }

 function verifyToken(token) {
    const payload = jwt.verify(token, scretkey);
    return payload;
 }


 module.exports = {
    createToken,
    verifyToken
 }
