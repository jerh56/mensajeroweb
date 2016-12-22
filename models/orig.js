var mongoose = require('mongoose');

// RegistroEmpresa Schema
var OrigSchema = mongoose.Schema({
	
	codpro: 		String,
	desdis: 		String,
	coddis: 		String,

});

module.exports = mongoose.model('Orig', OrigSchema);