var mongoose = require('mongoose');

var WaitlistSchema = mongoose.Schema({

    nombre: String,
    idroom: String

});

module.exports = mongoose.model('Waitlist', WaitlistSchema);