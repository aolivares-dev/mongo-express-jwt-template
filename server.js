'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const Connection = require('.\\models\\Model');
const ProductApiResource = require('.\\controllers\\ProductController');
// const UserApiResource = require('.\\controllers\\UserController');
const AuthController = require('.\\controllers\\Auth\\AuthController');
const JWTMiddleware = require('.\\middleware\\JWT-Middleware');

app.use(express.json());
Connection();

app.use('/auth', AuthController);

app.use(JWTMiddleware);
app.use('/products', ProductApiResource);
// app.use('/users', UserApiResource);

app.listen(process.env.PORT || 3000, () => {
	console.log("Servidor levantado... " + process.env.PORT || 3000);
})
