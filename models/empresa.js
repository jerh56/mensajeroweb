var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// RegistroEmpresa Schema
var EmpresaSchema = mongoose.Schema({
	
	Nombre_Empresa:	{type: String},
	Razon_Social:	{type: String},
	RFC:			{type: String, index:true},
	Email:			{type: String},
	Pais:			{type: String},
	Estado:			{type: String},
	Ciudad:			{type: String},
	Colonia:		{type: String},
	Calle:			{type: String},
	Num_calle:		{type: String},
	Telefono:		{type: String},

});

var Empresa = module.exports = mongoose.model('Empresa', EmpresaSchema);

module.exports.createEmpresa = function(newEmpresa, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newEmpresa.password, salt, function(err, hash) {
	        newEmpresa.password = hash;
	        newEmpresa.save(callback);
	    });
	});
}

module.exports.getEmpresaByRFC = function(RFC, callback){
	var query = {RFC: RFC};
	Empresa.findOne(query, callback);
}

module.exports.getEmpresaById = function(id, callback){
	Empresa.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}