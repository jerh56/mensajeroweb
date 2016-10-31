var express = require('express');
var router = express.Router();

// Get Homepage


router.get('/', function(req,res){
	res.render('index');
});


router.get('/inicio', ensureAuthenticated, function(req, res){
	res.render('inicio');
});

router.get('/configuracion', ensureAuthenticated, function(req, res){
	res.render('configuracion');
});

router.get('/registroempresa', ensureAuthenticated, function(req, res){
	res.render('registroempresa');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/login');
	}
}





module.exports = router;