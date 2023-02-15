const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const config = require("../config");

module.exports = {
	// Hash the password
	async register(req, res) {
		const { firstname, lastname, email, password } = req.body;
		const hash = await bcrypt.hash(password, 10);
		try {
			// Create a new user
			const user = new User({
				_id: new mongoose.Types.ObjectId(),
				firstname: firstname,
				lastname: lastname,
				email: email,
				password: hash,
			});

			await user.save();
			res.status(201).json({ message: "user created" });
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},
};
