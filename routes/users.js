var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/usuario', function(req, res){
	res.render('usuario', {message: req.flash('message'), user: req.user});
});


module.exports = router;
