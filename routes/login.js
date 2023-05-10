var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.get('login.html');
  //res.get('login')
  //res.render('login')
});

module.exports = router;
