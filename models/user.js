var mongoose = require('mongoose');



var userSchema = mongoose.Schema({
	
		
	Nombre:			String,
	Ap_Paterno:		String,
	Ap_Materno:		String,
	No_empleado:	Number,
	username:		String,
	password:		String,
	email:			String,
	Pais:			String,
	Estado:			String,
	Ciudad:			String,
	Area:			String,
	Departamento:	String,
	usertype:		String,
    createdAt: 		{type:Date, default: Date.now}
	
	
});

module.exports = mongoose.model('User', userSchema);