// const mongoose = require('mongoose');

// // const connectDB = async () => {
// //   try {
// //     const conn = await mongoose.connect("mongodb://127.0.0.1:27017/yourdbname");
// //     console.log(`MongoDB connected: ${conn.connection.host}`);
// //   } catch (error) {
// //     console.error('MongoDB connection FAILED:', error.message);
// //     process.exit(1);
// //   }
// // };

// mongoose.connect("mongodb://127.0.0.1:27017/yourdbname");
// const userSchema = new mongoose.Schema({
//   name: String,
//   nickname: String,
//   description: String,
//   category: {
//     type: Array,
//     default: []
//   },
//   datecreated: {
//     type: Date,
//     default: Date.now
//   }
// })

// module.exports = mongoose.model('User', userSchema);

// // module.exports = connectDB;
 
const mongoose = require('mongoose');

// connect to local MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/yourdbname");

// schema definition
const userSchema = new mongoose.Schema({
  name: String,         // simple string
  nickname: String,     // simple string
  description: String,  // simple string
  category: {           // array field
    type: Array,
    default: []
  },
  datecreated: {        // date field
    type: Date,
    default: Date.now   // auto-set current date when user is created
  }
});

// create a model (collection: "users")
module.exports = mongoose.model('User', userSchema);
