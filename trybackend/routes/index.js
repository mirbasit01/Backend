// var express = require('express');
// var router = express.Router();
// const UserModel = require("./users");
// const passport = require('passport');
// const localStrategy = require('passport-local');

// passport.use(new localStrategy(UserModel.authenticate()));

// router.get('/', function (req, res) {
//   res.render('index');
// });

// router.get('/profile', isLoggedIn, function (req, res) {
//   res.send("You are logged in as " + req.user.username)
// });


// router.post('/register', async function (req, res) {
//   let userdata = await UserModel({
//     username: string,
//     secret: string
//   });
//   UserModel.register(userdata, req.body.password,)
//     .then(function (registeredUser) {
//       passport.authenticate("local")(req, res, function () {
//         res.redirect('/profile');
//       });
//     })
    

// });

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/profile',
//   failureRedirect: '/login'
// }), function (req, res) {
//   res.send("You are logged in as " + req.user.username)
// });



// router.get('/logout', function (req, res, next) {
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
// });


// function isLoggedIn(req, res, next) {
//   if(req.isAuthenticated()){
//     return next();
//   }
//   res.redirect('/');
// }


// module.exports = router;

const express = require('express');
const router = express.Router();
const UserModel = require("./users");
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(UserModel.authenticate()));

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/profile', isLoggedIn, function (req, res) {
  res.send("You are logged in as " + req.user.username);
});

router.post('/register', async function (req, res) {
  try {
    let userdata = new UserModel({
      username: req.body.username,
      secret: req.body.secret
    });

    UserModel.register(userdata, req.body.password)
      .then(function (registeredUser) {
        passport.authenticate("local")(req, res, function () {
          res.redirect('/profile');
        });
      });
  } catch (err) {
    res.send(err);
  }
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  })
);

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
