var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/MensajeroRTC', function(err, db) {

    if (err) throw err;

    exports.cargarDpto = function(cb) {

        var Dpto = db.collection('dpto');

        Dpto.find().toArray(function(err, results) {
            cb(results);
        });
    };

    exports.cargarTipi = function(cd, cb) {

        var Tipi = db.collection('tipis');

        Tipi.find({coddep: cd}).toArray(function(err, results) {
            cb(results);
        });
    };

    exports.cargarOrig = function(cp, cb) {

        var Orig = db.collection('origs');

        Orig.find({codpro: cp}).toArray(function(err, results) {
            cb(results);
        });
    };

});