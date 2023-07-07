const mongoose = require("mongoose");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

module.exports = {
	// GET/:id
	async getUser(req, res) {
		try {
			const user = await User.findById(req.userId);
			res.status(200).json(user);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},

	// GET all users
	async getUsers(req, res) {
		try {
			const users = await User.find();
			res.status(200).json(users);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},

	// PUT/:id
	async updateUser(req, res) {
		const { id } = req.params;
		const {
			pseudo,
			firstname,
			lastname,
			email,
			password,
			dateOfBirth,
			isWaiting,
			transplant,
		} = req.body;

		const hash = await bcrypt.hash(password, 10);
		try {
			const user = await User.findByIdAndUpdate(id, {
				pseudo: pseudo,
				firstname: firstname,
				lastname: lastname,
				email: email,
				password: hash,
				dateOfBirth: dateOfBirth,
				isWaiting: isWaiting,
				transplant: transplant,
			});
			res.status(200).json(user);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},

	// DELETE/:id
	async deleteUser(req, res) {
		const { id } = req.params;
		try {
			const user = await User.findByIdAndDelete(id);
			res.status(200).json(user);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},
};
