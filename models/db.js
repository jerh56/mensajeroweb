var mongoose = require('mongoose');
var express = require('express');
var app = express();


var url = 'mongodb://localhost/MensajeroRTC';


mongoose.connect(url, function(err) {
    if (err){
    	console.log('Hay un error al conectar:' + err);
		throw err;
    } 
    else{
    	console.log('Se conectó a la BD');
    }
});


/*
module.exports = {
  'url_test' : 'mongodb://admin:123456@ds023245.mlab.com:23245/heroku_9gv89pgx',
  'url' : 'mongodb://localhost/MensajeroRTC'
}

*/