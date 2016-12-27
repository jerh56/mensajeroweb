var mongoose = require('mongoose');

var AgentnamesSchema = mongoose.Schema({

    nombre: String,
    idroom: String,
    cantidad: { type: Number, default: 0 }

});

module.exports = mongoose.model('Agentnames', AgentnamesSchema);