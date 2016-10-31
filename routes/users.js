var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Empresa = require('../models/empresa');

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

// registro empresa
router.get('/registroempresa', function(req, res){
	res.render('registroempresa');
});

//Configuracion
router.get('/configuracion', function(req, res){
	res.render('configuracion')
});

// Register User
router.post('/register', function(req, res){
	var Nombre = req.body.Nombre;
	var Ap_Paterno = req.body.Ap_Paterno;
	var Ap_Materno = req.body.Ap_Materno;
	var username = req.body.username;
	var Puesto = req.body.Puesto;
	var password = req.body.password;
	var password2 = req.body.password2;
	var email = req.body.email;
	var Pais = req.body.Pais;
	var Estado = req.body.Estado;
	var Ciudad = req.body.Ciudad;
	var Area = req.body.Area;
	var Departamento = req.body.Departamento;
	
	
	

	// Validation
	req.checkBody('Nombre', 'Nombre is required').notEmpty();
	req.checkBody('Ap_Paterno', 'Ap_Paterno is required').notEmpty();
	req.checkBody('Ap_Materno', 'Ap_Materno is required').notEmpty();
	req.checkBody('username', 'username is required').notEmpty(); //numero de empleado
	req.checkBody('Puesto', 'Puesto is required').notEmpty();
	req.checkBody('password', 'password is required').notEmpty();
	req.checkBody('password2', 'passwords do not match').equals(req.body.password);
	req.checkBody('email', 'email is required').notEmpty();
	req.checkBody('email', 'email is not valid').isEmail();	
	req.checkBody('Pais', 'Pais is required').notEmpty();
	req.checkBody('Estado', 'Estado is required').notEmpty();
	req.checkBody('Ciudad', 'Ciudad is required').notEmpty();
	req.checkBody('Area', 'Area is required').notEmpty();
	req.checkBody('Departamento', 'Departamento is required').notEmpty();
	
	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			Nombre: Nombre,
			Ap_Paterno : Ap_Paterno,
			Ap_Materno : Ap_Materno,
			username : username,
			Puesto : Puesto,
			password: password,
			email : email,
			Pais : Pais,
			Estado : Estado,
			Ciudad : Ciudad,
			Area : Area,
			Departamento : Departamento,
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/login');
	}
});


// registroempresa
router.post('/registroempresa', function(req, res){
	var Nombre_Empresa = req.body.Nombre_Empresa;
	var Razon_Social = req.body.Razon_Social;
	var RFC = req.body.RFC;
	var Email = req.body.Email;
	var Pais = req.body.Pais;
	var Estado = req.body.Estado;
	var Ciudad = req.body.Ciudad;
	var Colonia = req.body.Colonia;
	var Calle = req.body.Calle;
	var Num_calle = req.body.Num_calle;
	var Telefono = req.body.Telefono;
	
	

	// Validation
	req.checkBody('Nombre_Empresa', 'Nombre_Empresa is required').notEmpty();
	req.checkBody('Razon_Social', 'Razon_Social is required').notEmpty();
	req.checkBody('RFC', 'RFC is required').notEmpty();
	req.checkBody('Email', 'Email is required').notEmpty();
	req.checkBody('Email', 'Email is not valid').isEmail();	
	req.checkBody('Pais', 'Pais is required').notEmpty();
	req.checkBody('Estado', 'Estado is required').notEmpty();
	req.checkBody('Ciudad', 'Ciudad is required').notEmpty();
	req.checkBody('Colonia', 'Colonia is required').notEmpty();
	req.checkBody('Calle', 'Calle is required').notEmpty();
	req.checkBody('Num_calle', 'Num_calle is required').notEmpty();
	req.checkBody('Telefono', 'Telefono is required').notEmpty();
	
	var errors = req.validationErrors();

	if(errors){
		res.render('registroempresa',{
			errors:errors
		});
	} else {
		var newEmpresa = new Empresa({
		Nombre_Empresa: Nombre_Empresa,
		Razon_Social: Razon_Social,
		RFC: RFC,
		Email: Email,
		Pais: Pais,
		Estado: Estado,
		Ciudad: Ciudad,
		Colonia: Colonia,
		Calle: Calle,
		Num_calle: Num_calle,
		Telefono: Telefono,
		});

		Empresa.createEmpresa(newEmpresa, function(err, Empresa){
			if(err) throw err;
			console.log(Empresa);
		});

		req.flash('success_msg', 'Se registro Empresa exitosamente');

		res.redirect('/inicio');
	}

});



passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'contraseña invalida'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/inicio', failureRedirect:'/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/inicio');
  });

router.get('/logout', function(req, res){
	req.logout();
	req.session.destroy();
	res.clearCookie('connect.sid');
	res.redirect('/login');
});

module.exports = router;