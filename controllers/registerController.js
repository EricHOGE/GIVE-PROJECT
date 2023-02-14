const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("../config");

module.exports = {
	// Hash the password
	register(req, res) {
		bcrypt.hash(req.body.password, 10, (err, hash) => {
			if (err) {
				return res.status(500).json({
					error: err,
				});
			} else {
				// Create a new user
				const user = new User({
					_id: new mongoose.Types.ObjectId(),
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					email: req.body.email,
					password: hash,
					createdAt: Date.now(),
				});
				// Save the user
				user
					.save()
					.then((result) => {
						console.log(result);
						// Create a JWT
						const token = jwt.sign(
							{
								email: user.email,
								userId: user._id,
							},
							config.secret,
							{
								expiresIn: "1h",
							}
						);
						res.status(201).json({
							message: "User created",
							token: token,
						});
					})
					.catch((err) => {
						console.log(err);
						res.status(500).json({
							error: err,
						});
					});
			}
		});
	},
};
