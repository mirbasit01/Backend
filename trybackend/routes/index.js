// var express = require('express');
// var router = express.Router();
// const usermodel = require("./users");

// router.get('/', function (req, res) {
//   res.render('index');
// });

// router.get('/create', async function (req, res) {
//   let userdata =  await usermodel.create({
//     name: 'abdul',
//     nickname: 'king',
//     description: 'A software developer',
//     category: ['nodejs', 'reactjs', 'mongodb' , 'javascript' , 'expressjs' , 'html' , 'css' ],
//     datecreated: {
//       type: Date,
//       default: Date.now()
//     }
//   })
//   res.send(userdata)
// })



// router.get('/find', async function (req, res) {
//   let users = await usermodel.find({
//     $expr:{
//      $and:[
//        {$gt: [{$size: "$category"} ,3]},
//        {$lt: [{$size: "$category"} ,6]}
//      ]

//     }
//   });
//   res.send(users);
// });

// module.exports = router;

var express = require('express');
var router = express.Router();
 const User = require("./users");

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/create', async function (req, res) {
  let userdata = await await User.create({
  name: "mirbasit01",
  nickname: "Dev new ",
  description: "Learning Express and MongoDB",
  category: ["nodejs", "mongodb" , "expressjs", "javascript", "html", "css"]
});
  res.send(userdata);
});


router.get('/all', async function (req, res) {
  let users = await User.find();
  res.send(users);
});

// router.get('/find', async function (req, res) {
//   let users = await usermodel.find({
//     $expr: {
//       $and: [
//         { $gt: [{ $size: "$category" }, 3] },
//         { $lt: [{ $size: "$category" }, 6] }
//       ]
//     }
//   });
//   res.send(users);
// });

module.exports = router;
