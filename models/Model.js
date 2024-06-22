'use strict';
const mongoose = require('mongoose');

const Connection = () => {
	mongoose.connect('mongodb://127.0.0.1:27017/dev-app')
		.then(() => {
			console.log("Conexion exitosa");
		})
		.catch((error) => {
			console.log("Error de conexión", error);
		});
};

module.exports = Connection;