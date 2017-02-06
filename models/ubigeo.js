var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/MensajeroRTC', function(err, db) {

    if (err) throw err;

    exports.cargarDpto = function(cb) {

        var Dpto = db.collection('dpto');

        Dpto.find().toArray(function(err, results) {
            cb(results);
        });
    };


    exports.cargarOrig = function(co) {

        var Orig = db.collection('origs');

        Orig.find().toArray(function(err, results) {
            co(results);
        });
    };    

    exports.cargarTipi = function(cd, cb) {

        var Tipi = db.collection('tipis');

        Tipi.find({ $and: [ {coddep: cd}, {"status":true} ] }).toArray(function(err, results) {
            cb(results);
        });
    };

});