'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const Connection = require('.\\models\\Model');
const ProductApiResource = require('.\\controllers\\ProductController');
const UserApiResource = require('.\\controllers\\UserController');

app.use(express.json());

Connection();
app.use('/products', ProductApiResource);
app.use('/users', UserApiResource);

app.listen(process.env.PORT || 3000, () => {
	console.log("Servidor levantado... " + process.env.PORT || 3000);
})
