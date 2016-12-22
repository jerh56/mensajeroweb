var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/MensajeroRTC', function(err, db) {

    if (err) throw err;

    exports.cargarDpto = function(cb) {

        var Dpto = db.collection('dpto');

        Dpto.find().toArray(function(err, results) {
            cb(results);
        });
    };

    exports.cargarDialogo = function(cd, cb) {

        var Dialogo = db.collection('dialogos');

        Dialogo.find({coddep: cd}).toArray(function(err, results) {
            cb(results);
        });
    };



});