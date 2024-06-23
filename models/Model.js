'use strict';
const mongoose = require('mongoose');

const Connection = () => {
	mongoose.connect(process.env.DB_URL)
		.then(() => {
			console.log("Conexion exitosa");
		})
		.catch((error) => {
			console.log("Error de conexión", error);
		});
};

module.exports = Connection;