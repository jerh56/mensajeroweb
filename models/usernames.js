var mongoose = require('mongoose');

var UsernameSchema = mongoose.Schema({

    nombre: String,
    socketid: String

});

module.exports = mongoose.model('Username', UsernameSchema);