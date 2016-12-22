var ug = require('../models/ubigeo');

module.exports = exports = {

    tipificacion: function(req, res) {
        /*res.render('index', {
            titulo: "Listas Desplegables en MEAN con rutas"
        });*/
        res.sendFile('tipificacion.html', {root: './views'});
    },

    dpto: function(req, res) {
        ug.cargarDpto(function(data) {
            res.json(data);
        });
    },

    tipi: function(req, res) {
        var cd = req.params.cd;

        ug.cargarTipi(cd, function(data) {
            res.json(data);
        });
    },

    orig: function(req, res) {
        var cp = req. params.cp;

        ug.cargarOrig(cp, function(data) {
            res.json(data);
        });
    }
};