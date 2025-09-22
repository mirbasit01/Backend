var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/failed', function(req, res) {
  req.flash("error_msg", 12);
  res.send("Failed");
 });

router.get('/checknow', function(req, res) {
  // req.flash("error_msg");
  console.log(req.flash("error_msg"));
  res.send("Checked");
 });


module.exports = router;
