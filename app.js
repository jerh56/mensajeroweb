var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// FLASH
var flash = require('connect-flash'); // middleware para mensajes en passport
// FLASH

var routes = require('./routes/index');
var users = require('./routes/users');

// EJS
var ejs = require('ejs'); // Render
// EJS

// Mongoose
var dbConfig = require('./models/db.js');
var mongoose = require('mongoose');
var User = require('./models/user.js');
// Mongoose

var app = express();

// SOCKET.IO
var passportSocketIo = require('passport.socketio');
app.io = require('socket.io')();
// SOCKET.IO

//REDIS
var session = require('express-session'); // Manejo de sesiones
var RedisStore = require('connect-redis')(session); // conexión a REDIS para almacenar sesiones de usuario
var sessionRedis = new RedisStore({
   host: '127.0.0.1',
   port: 6379,
   db: 0,
   //pass: '1j79ol4f'
 });
// REDIS

// PASSPORT
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.js');
//var bCrypt = require('bcrypt');
var bCrypt = require('bcryptjs'); //este modulo es la version compatible con la plataforma windows de bcrypt

// PASSPORT

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// EJS
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
// EJS
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//REDIS
app.use(session({  store: sessionRedis, secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// REDIS
// FLASH
app.use(flash());
// FLASH

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());
// PASSPORT


// SOCKET.IO
app.io.use(passportSocketIo.authorize({
  key: 'connect.sid',
  secret: 'keyboard cat',
  store: sessionRedis,
  passport: passport,
  cookieParser: cookieParser
}));
// SOCKET:IO


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// PASSPORT
passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

//LOGIN DE USUARIOS
// passport/login.js
passport.use('login', new LocalStrategy({
    passReqToCallback : true,
    usernameField: 'email'  // Aqui puede usarse el username, email, o codigo de empleado
   },
  function(req, username, password, done) { 
    //Se consulta en mongo si el username existe o no
    User.findOne({ 'email' :  username }, 
      function(err, user) {

        if (err)
          return done(err);
        //si el usuario no existe se envia el error y el redirect back
        if (!user){
          console.log('No se encontró el usuario: ' + username);
          return done(null, false, req.flash('message', 'La cuenta o contraseña son incorrectas.'));                 
        }
        // El usuario existe pero la contraseña es incorrecta
        if (!isValidPassword(user, password)){
          console.log('Contraseña inválida');
          return done(null, false, req.flash('message', 'Contraseña inválida.'));
        }

        //usuario existente y contraseña correcta
        return done(null, user,req.flash('message', 'Inicio de sesión correcto.'));
      }
    );
}));


//LOGIN DE AGENTES
// PASSPORT/LOGIN.JS
passport.use('ag_login', new LocalStrategy({
    passReqToCallback : true,
    usernameField: 'email'   // Aqui puede usarse el username, email, o codigo de empleado
   },
  function(req, username, password, done) { 
    User.findOne({ 'email' :  username }, 
      function(err, user) {
  

        if (err)
          return done(err);
        if (!user){
          console.log('No se encontró el usuario' + username);
          return done(null, false, req.flash('message', 'La cuenta no existe.'));                 
        }

   
        if (!isValidPassword(user, password)){
          console.log('Contraseña inválida');
          return done(null, false, req.flash('message', 'Contraseña inválida.'));
        }

        return done(null, user,req.flash('message', 'Agente inicio sesión correctamente.'));
      }
    );
}));



//Signup para usuarios
passport.use('signup', new LocalStrategy({
    passReqToCallback : true,
    usernameField: 'email'
  },
  function(req, username, password, done) {

    findOrCreateUser = function(){
	// Busca el username en Mongodb

     User.findOne({'email':username},function(err, user) {
        // en caso de error
         if (err){
           console.log('Error al crear cuenta: '+err);
           return done(err);
         }
        // En caso de que ya existe el usuario
        if (user){
          console.log('User already exists');
          return done(null, false,req.flash('message', 'Usuario ya existe.'));
        } 
        else {
          //cuando no exista el email del usuario se crea un nuevo usuario
          // la variable User esta declarada y es un require al modelo de Users.
          var newUser = new User();
          // set the user's local credentials

          console.log(req.params);
          console.log(req.query);
          console.log(req.body);

			newUser.Nombre = req.body.Nombre;
			newUser.Ap_Paterno = req.body.Ap_Paterno;
			newUser.Ap_Materno = req.body.Ap_Materno;
			newUser.username = req.body.userlongname;
			newUser.password = createHash(password);
			newUser.email = req.body.email;
      newUser.No_empleado = req.body.No_empleado;
			newUser.Pais = req.body.Pais;
			newUser.Estado = req.body.Estado;
			newUser.Ciudad = req.body.Ciudad;
			newUser.Area = req.body.Area;
			newUser.Departamento = req.body.Departamento;
			newUser.usertype = 'user';
			
			

			console.log(newUser);     
 
          //Se guarda el usuario
          //en caso de error
          newUser.save(function(err){
            if (err){
              console.log('No se pudo guardar el usuario: '+err);  
              throw err;  
            }
            //si no existe error
            console.log('Se registró correctamente el usuario');
            return done(null, newUser, req.flash('message', 'Se registró correctamente el usuario.'));
                    
          });
        }
      });

    };
 
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  }));

//Signup para Agentes
  passport.use('ag_signup', new LocalStrategy({
    passReqToCallback : true,
    usernameField: 'email'
  },
  
    function(req, username, password, done) {

    findOrCreateUser = function(){

     User.findOne({'email':username},function(err, user) {
         if (err){
           console.log('Error al crear cuenta: '+err);
           return done(err);
         }

        if (user){
          console.log('User already exists');
          return done(null, false,req.flash('message', 'Usuario ya existe.'));
        } 
        else {
          var newUser = new User();

          console.log(req.params);
          console.log(req.query);
          console.log(req.body);

			newUser.Nombre = req.body.Nombre;
			newUser.Ap_Paterno = req.body.Ap_Paterno;
			newUser.Ap_Materno = req.body.Ap_Materno;
			newUser.username = req.body.userlongname;
			newUser.password = createHash(password);
			newUser.email = req.body.email;
      newUser.No_empleado = req.body.No_empleado;
			newUser.Pais = req.body.Pais;
			newUser.Estado = req.body.Estado;
			newUser.Ciudad = req.body.Ciudad;
			newUser.Area = req.body.Area;
			newUser.Departamento = req.body.Departamento;
			newUser.usertype = 'agent';
			
			

			console.log(newUser);

 
          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('No se pudo guardar el usuario: '+err);  
              throw err;  
            }
            console.log('Se registró correctamente el usuario');
            return done(null, newUser, req.flash('message', 'Se registró correctamente el usuario.'));
            
          });
        }
      });

    };
 
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  }));


var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

// Genera hash usando bCrypt var declarada y hace require al modulo bcryptjs o bcryp
var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

// PASSPORT




module.exports = app;
