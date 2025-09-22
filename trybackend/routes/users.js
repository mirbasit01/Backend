const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

// connect to local MongoDB
// connect to local MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/yourdbname", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

 const userSchema = new mongoose.Schema({
 username: String,
  secret: String
});
userSchema.plugin(plm);

// create a model (collection: "users")
module.exports = mongoose.model('User', userSchema);
