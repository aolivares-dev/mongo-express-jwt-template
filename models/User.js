'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const Model = new mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

const User = mongoose.model('Users', Model);

module.exports = User;