var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

router.get('/users/configuracion', ensureAuthenticated, function(req, res){
	res.render('configuracion');
});

router.get('/users/registroempresa', ensureAuthenticated, function(req, res){
	res.render('registroempresa');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}





module.exports = router;