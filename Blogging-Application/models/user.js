const {createHmac, randomBytes} = require('node:crypto');
const { Schema, model } = require('mongoose');
const { createToken } = require('../services/authentication');


const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    profileImgUrl: {
        type: String,
        default: "/images/default.png.png",
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, { timestamps: true })


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
});


userSchema.statics.matchPasswordAndGenerateToken = async function(email, password) {
    const user = await this.findOne({email});
    if(!user) throw new Error('User not found');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userEnteredHash = createHmac('sha256', salt)
        .update(password)
        .digest('hex');

        if(hashedPassword !== userEnteredHash) throw new Error('Incorrect Password'); 

        const token = createToken(user);
        return {token};

 }

const User = model('user', userSchema);
module.exports = User;