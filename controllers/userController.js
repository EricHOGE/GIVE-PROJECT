const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// USER MODEL CRUD

module.exports = {
	// POST user
	async register(req, res) {
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
			// Create a new user
			const user = new User({
				_id: new mongoose.Types.ObjectId(),
				pseudo: pseudo,
				firstname: firstname,
				lastname: lastname,
				email: email,
				password: hash,
				dateOfBirth: dateOfBirth,
				isWaiting: isWaiting,
				transplant: transplant,
			});
			console.log("user => ", user);

			await user.save();
			res.status(201).json({ message: "user created" });
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},

	// GET/:id
	async getUser(req, res) {
		const { id } = req.params;
		try {
			const user = await User.findById(id);
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
