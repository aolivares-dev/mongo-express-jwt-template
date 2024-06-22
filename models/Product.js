'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const Model = new mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	name: { type: String, required: true },
	description: { type: String, required: false },
	price: { type: Number, required: true }
});

const Product = mongoose.model('Products', Model);

module.exports = Product;