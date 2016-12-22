var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var passport = require('passport');
var Tipificacion = require('../models/tipi.js');
var Dialogo = require('../models/dialogo.js');
var Origen = require('../models/orig.js');
var Empresa = require('../models/empresa.js');
var Departamento = require('../models/departamento.js');
var ubigeo = require('../controllers/ubigeo');
var dialogo = require('../controllers/lista_mensaje');


//ejemplo listas desplegables lista_mensaje

router.get('/lista_mensaje', function(req,res){
  res.render('lista_mensaje');
});

router.get('/tipificacion', ubigeo.tipificacion);
router.get('/tipificacion/db/dpto', ubigeo.dpto);
router.get('/tipificacion/db/tipi/:cd', ubigeo.tipi);
router.get('/tipificacion/db/orig/:cp', ubigeo.orig);


router.get('/dialogos/db/dpto', dialogo.dpto);
router.get('/dialogos/db/dialogo/:cd', dialogo.dialogo);
//router.get('/lista_mensaje/db/orig/:cp', lista_mensaje.orig);


router.get('/listas', require('connect-ensure-login').ensureLoggedIn('/login'), function (req, res) {
  //res.sendFile(__dirname + '/indexUser.html');

  res.render('listas', ubigeo.listas);
});


//ejemplo listas desplegables



router.get('/burbuja', function(req, res){
  res.render('burbuja');
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

	router.get('/user', require('connect-ensure-login').ensureLoggedIn('/login'), function (req, res) {
	  //res.sendFile(__dirname + '/indexUser.html');
	  console.log(req.user.username);
	  res.render('user', { username: req.user.username});
	});
	
	
  router.get('/agent', require('connect-ensure-login').ensureLoggedIn('/ag_login'), function (req, res) {
    //res.sendFile(__dirname + '/indexUser.html');
    console.log(req.user.username);
    res.render('agent', { agentname: req.user.username});
  });

// PASSPORT

  router.get('/login', function(req, res) {
    //console.log(req.flash('message'));
   
    //res.render('login', {message: 'dfjhdjhsjd'});
    var msjres = req.flash('message');
    res.render('login', {message: msjres[0]});

  });
  
    router.get('/ag_login', function(req, res) {
    //console.log(req.flash('message'));
   
    //res.render('login', {message: 'dfjhdjhsjd'});
    var msjres = req.flash('message');
    res.render('ag_login', {message: msjres[0]});
  });

		//REGISTRO USUARIOS
	router.get('/registro', function(req, res) {
	// Display the Login page with any flash message, if any
	res.render('registro', {message: req.flash('message')});
	});
	
		//REGISTRO AGENTES
	router.get('/ag_registro', function(req, res) {
	// Display the Login page with any flash message, if any
	res.render('ag_registro', {message: req.flash('message')});
	});

	//ENSURELOGGED USSERS
 router.get('/principal',
 	require('connect-ensure-login').ensureLoggedIn('/login'),function(req, res){

          res.render('principal', {message: req.flash('message'), user: req.user});
 });

  //ENSURELOGGED USSERS
 router.get('/usuario',
  require('connect-ensure-login').ensureLoggedIn('/login'),function(req, res){

          res.render('usuario', {message: req.flash('message'), user: req.user});
 });

 router.get('/agente',
  require('connect-ensure-login').ensureLoggedIn('/ag_login'),function(req, res){

          res.render('agente', {message: req.flash('message'), user: req.user});
 });

  router.get('/seleccion_empresa',
  require('connect-ensure-login').ensureLoggedIn('/ag_login'),function(req, res){

          res.render('seleccion_empresa', {message: req.flash('message'), user: req.user});
 });


  router.get('/chatuser',
require('connect-ensure-login').ensureLoggedIn('/ag_login'),function(req, res){

        res.render('chatuser', {message: req.flash('message'), user: req.user});
});

  
 
	//ENSURELOGGED AGENT
  router.get('/ag_principal',
 	require('connect-ensure-login').ensureLoggedIn('/ag_login'),function(req, res){
 		console.log(req.user);
          res.render('ag_principal', {message: req.flash('message'), user: req.user});
 });

router.get('/agente',
  require('connect-ensure-login').ensureLoggedIn('/ag_login'),function(req, res){
    console.log(req.user);
          res.render('agente', {message: req.flash('message'), user: req.user});
 });
 

 

  router.get('/signup_success', require('connect-ensure-login').ensureLoggedIn('/login'),
    function(req, res){
        //var msjres = req.flash('success');
        //res.setHeader('Content-Type', 'application/json');
        var msjres = req.flash('message');
        
        //res.send(JSON.stringify({ error: 0, message: msjres[0]}));
		res.render('principal', {message: msjres[0], user: req.user});

  });
  
  router.get('/ag_signup_success', require('connect-ensure-login').ensureLoggedIn('/ag_login'),
    function(req, res){
        //var msjres = req.flash('success');
        //res.setHeader('Content-Type', 'application/json');
        var msjres = req.flash('message');
        
        //res.send(JSON.stringify({ error: 0, message: msjres[0]}));
		res.render('ag_principal', {message: msjres[0], user: req.user});

  });


  // Si sucede un error al registrar un usuario se ejecuta esta ruta
  router.get('/signup_error', function(req, res) {
     var msjres = req.flash('message');
    // if (msjres[0]!= undefined){
         //console.log(msjres[0]);
         //res.setHeader('Content-Type', 'application/json');
         //res.send(JSON.stringify({ error: 1, message: msjres[0]}));
    	res.render('signup_error', {message: msjres[0], user: req.user});
    // }
    // else {
    //      res.redirect('/');
    // }
  });
  
  // Si sucede un error al registrar un usuario se ejecuta esta ruta
  router.get('/ag_signup_error', function(req, res) {
     var msjres = req.flash('message');
    // if (msjres[0]!= undefined){
         //console.log(msjres[0]);
         //res.setHeader('Content-Type', 'application/json');
         //res.send(JSON.stringify({ error: 1, message: msjres[0]}));
        console.log(req.flash('failure'));
    	res.render('ag_signup_error', {message: msjres[0], user: req.user});
    // }
    // else {
    //      res.redirect('/');
    // }
  });
// PASSPORT

//INCIDENCIA
router.get('/administrador', function (req,res){
  res.render('administrador');
});

router.get('/tipificacion', function(req,res){
  res.render('tipificacion');
});

router.post('/tipificacion', function(req, res){


        var countinci = req.body.coddep * 100; 
        var countorig = countinci * 10 + countinci;
        console.log('Codigo Departamento: '+req.body.coddep);
        console.log('Codigo Incidencia: '+countinci);

  Tipificacion.count( { $and: [ {"codpro":{$gte:countinci}}, {"codpro":{$lt: countinci+100}} ]}, function(err,nCount){

          console.log(countorig);
          var newTipificacion = new Tipificacion();

          newTipificacion.codpro = countinci+nCount+1;
          newTipificacion.despro = req.body.despro;
          newTipificacion.coddep = req.body.coddep;


          newTipificacion.save(function(err) {
          if (err){
          console.log('No se pudo guardar el incidencia: '+err);
          res.render('error', {message: 'No se pudo guardar el incidencia: '+err});
          }
          else{
          console.log('se guardo incidencia');
          }
          });


  Origen.count({ $and: [ {"coddis":{$gte:countorig}}, {"coddis":{$lt: countorig+100}} ]}, function(err, origCount){

          console.log('Este es el counter de Origen: ' +origCount);

          var newOrigen = new Origen();

          newOrigen.codpro = countinci+nCount+1;
          newOrigen.desdis = req.body.desdis;
          newOrigen.coddis = countorig+origCount+1;


          newOrigen.save(function(err) {
          if (err){
            console.log('No se pudo guardar el Origen: '+err);
            res.render('error', {message: 'No se pudo guardar el Origen: '+err});
            }
            else{
              console.log('se guardo Origen');

              res.render('tipificacion', {message: 'se guardo Origen'});

            }
          })


        });

      });

    }
  );



//ACTUALIZACION DE INCIDENCIAS


router.post('/tipificacionupdate', function(req,res){

  var codpro = req.body.codpro;

  Tipificacion.findOne({"codpro": codpro}, function(err, doc){

    if (err || !doc){
      console.log(err);      
    }
    else{

      doc.despro = req.body.despro;

        doc.save(function(err){
        if (err){
        console.log(err);
        }
        else
        {

      console.log('Codpro: '+ codpro);
      console.log('Se actualizo Incidencia' +doc);
          
      };
    });
    }

  });//findone function

  var coddis = req.body.coddis;

  Origen.findOne({"coddis": coddis}, function(err, doc){

    if (err || !doc){
      console.log(err);      
    }
    else{

      doc.desdis = req.body.desdis;

        doc.save(function(err){
        if (err){
        console.log(err);
        }
        else
        {

      console.log('Coddis: '+ coddis);
      console.log('Se actualizo Origen' +doc);
      res.render('tipificacion', {message: 'Se Actualizo correctamente'});
    
      };
    });
    }

  });//findone function

});//function post

//ACTUALIZACION DE INCIDENCIAS

//INCIDENCIA

//DIALOGOS PREDETERMINADOS
router.get('/dialogos', function(req, res) {

  var msjres = req.flash('message');
  res.render('dialogos', {message: msjres[0]});
});

router.post('/dialogos', function(req, res){

  var tecla1 = req.body.tecla_1;
  var tecla2 = req.body.tecla_2;
  var coddep = req.body.coddep;
  var coddial = coddep*100;

  Dialogo.findOne({$and: [ {"tecla_1": tecla1}, {"tecla_2": tecla2}, {"coddep": coddep}]}, function(err, doc){

    if (!doc)
    {

      Dialogo.count({$and: [ {"coddep":{$gte:coddep}}, {"coddep":{$lt: coddial+100}} ]}, function (err, nCount){

         var newDialogo = new Dialogo();
                
                newDialogo.coddial = coddial+nCount+1;
                newDialogo.desdia = req.body.desdia;
                newDialogo.coddep = req.body.coddep;
                newDialogo.tecla_1 = req.body.tecla_1;
                newDialogo.tecla_2 =  req.body.tecla_2;
                

      newDialogo.save(function(err) {
        if (err){
          console.log('No se pudo registrar la dialogo : '+err);
          res.render('error', {message: 'No se pudo registrar la dialogo :'});
          }
          else{
            console.log('se guardo dialogo');
            res.render('dialogos', {message: 'Se registro correctamente el dialogo'});

          }
       });
      });
    }
    else
    {
      console.log("Se encontro Comando " + doc);
      res.render('dialogos', {message: 'Comando ya existe'});

    }


  });

  });//dialogo post

//ACTUALIZAR DIALOGOS PREDETERMINADOS

router.post('/dialogosupdate', function(req,res){

 var coddial = req.body.coddial;

  Dialogo.findOne({"coddial": coddial}, function(err, doc){

    if (err || !doc){
      console.log(err);  
       res.render('error', {message: 'No se pudo modificar la dialogo :'});    
    }
    else{

      doc.desdia = req.body.desdia;

        doc.save(function(err){
        if (err){
        console.log(err);
        }
        else
        {

      console.log('Coddial: '+ coddial);
      console.log('Se actualizo Dialogo' +doc);
      res.render('dialogos', {message: 'Se actualizo el dialogo correctamente'})
          
      };
    });
    }

  });//findone function

});//function post


//ACTUALIZAR DIALOGOS PREDETERMINADOS


//DIALOGOS PREDETERMINADOS

//REGISTRO DE EMPRESA

  router.get('/registro_empresa',
  require('connect-ensure-login').ensureLoggedIn('/ag_login'),function(req, res){

          res.render('registro_empresa', {message: req.flash('message'), user: req.user});
 });


router.post('/registro_empresa', function(req, res){

      var newEmpresa = new Empresa();


          newEmpresa.Nombre = req.body.Nombre;
          newEmpresa.Razon_social = req.body.Razon_social;
          newEmpresa.RFC = req.body.RFC;
          newEmpresa.Pais = req.body.Pais;
          newEmpresa.Estado = req.body.Estado;
          newEmpresa.Ciudad = req.body.Ciudad;
          newEmpresa.Colonia = req.body.Colonia;
          newEmpresa.Calle = req.body.Calle;
          newEmpresa.Numero = req.body.Numero;
          newEmpresa.Telefono = req.body.Telefono;



      newEmpresa.save(function(err) {
        if (err){
          console.log('No se pudo registrar la empresa : '+err);
          res.render('error', {message: 'No se pudo registrar la empresa :'+err});
          }
          else{
            console.log('se guardo empresa');
            res.render('registro_empresa', {message: 'se registro correctamente la empresa'});

          }
        })
    }
    );

//REGISTRO DE EMPRESA

//ORIGEN DE INCIDENCIAS


router.get('/origenincidencias', function(req,res){
  res.render('origenincidencias');
});

router.post('/origenincidencias', function(req, res){

      var newOrigen = new Origen();

      newOrigen.Num_origen = req.body.Num_origen;
      newOrigen.Origen = req.body.Origen;
      newOrigen.Area = req.body.Area;



      newOrigen.save(function(err) {
        if (err){
          console.log('No se pudo guardar dialogo : '+err);
          res.render('error', {message: 'No se pudo guardar dialogo: '+err});
          }
          else{
            console.log('se guardo dialogo');
            res.render('origenincidencias', {message: 'se guardo dialogo correctamente'});

          }
        })
    }
    );

//ORIGEN DE INCIDENCIAS

//SELECCION DE DEPARTAMENTO Y DESCRIPCION DE INCIDENCIA

router.post('/departamento', function(req, res){

      var newDepartamento = new Departamento();

      newDepartamento.Departamento = req.body.Departamento;
      newDepartamento.Descripcion = req.body.Descripcion;


      newDepartamento.save(function(err) {
        if (err){
          console.log('No se pudo guardar descripcion y departamento : '+err);
          res.render('error', {message: 'No se pudo guardar descripcion y departamento: '+err});
          }
          else{
            console.log('se guardo descripcion');
            console.log(newDepartamento);
            console.log(req.user);
            res.render('departamento', {message: req.flash('message'), newDepartamento, user: req.user});
          }
        })
    }
    );

//SELECCION DE DEPARTAMENTO Y DESCRIPCION DE INCIDENCIA
// SOCKET.IO
/* router.get('/chat',
 	require('connect-ensure-login').ensureLoggedIn('/login'),function(req, res){

    console.log(req.Departamento);
          res.render('chat', {message: req.flash('message'), departamento: req.Departamento});
 });*/
// SOCKEY.IO



// PASSPORT USUARIOS
  router.post('/signin', passport.authenticate('login', {
    successRedirect: '/usuario',
    failureRedirect: '/login',
    failureFlash : true,
    successFlash : true 
  }));
 
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/signup_success',
    failureRedirect: '/signup_error',
    failureFlash : true, 
    successFlash : true 
  }));
// PASSPORT USUARIOS


// PASSPORT AGENTESF
  router.post('/ag_signin', passport.authenticate('ag_login', {
    successRedirect: '/agente',
    failureRedirect: '/ag_login',
    failureFlash : true,
    successFlash : true 
  }));
 
  router.post('/ag_signup', passport.authenticate('ag_signup', {
    successRedirect: '/ag_signup_success',
    failureRedirect: '/ag_signup_error',
    failureFlash : true, 
    successFlash : true 
  }));
// PASSPORT AGENTES



//LOGOUT
router.get('/logout', function(req, res){
	req.logout();
	req.session.destroy();
	res.clearCookie('connect.sid');
	res.redirect('/');
});

//AGENTE LOGOUT
router.get('/ag_logout', function(req, res){
  req.logout();
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/ag_login');
});


module.exports = router;