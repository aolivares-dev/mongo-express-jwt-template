'use strict';
const express = require('express');
const mongoose = require('mongoose');
const encrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const router = express.Router();
const User = require('..\\..\\models\\User');

router.post("/sign-up", async (req, res) => {
	try {
		let { username, email, password } = req.body;

		password = encrypt.hashSync(password, encrypt.genSaltSync(10));

		const user = new User({ username, email, password });

		await user.save();

		JWT.sign({ username: user.username }, process.env.API_KEY, { expiresIn: '1h' }, (error, token) => {
			if (error) {
				return res.status(501).json({ message: error.message })
			}
			return res.json({ token, user });
		});

	} catch (error) {

		res.status(500).json({ message: error.message });
	}
});

router.post("/sign-in", async (req, res) => {
	try {
		let username = req.body.username;
		let password = req.body.password;

		const user = await User.findOne({ username });

		if (encrypt.compareSync(password, user.password)) {
			JWT.sign({ username: user.username }, process.env.API_KEY, { expiresIn: '1h' }, (error, token) => {
				if (error) {
					return res.status(501).json({ message: error.message })
				}
				return res.json({ token, user });
			});
		} else {
			return res.status(401).json({ message: "No esta autorizado." });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;