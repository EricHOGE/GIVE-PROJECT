const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const config = require("../config");

const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

const generateToken = (payload, res) => {
	jwt.sign(payload, config.secret, { expiresIn: "1d" }, (err, token) => {
		if (err) {
			console.error(err.message);
			return res
				.status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
				.json({ error: "Erreur lors de la génération du token" });
		}
		console.log("token => ", token);
		return res.status(201).json({ token });
	});
};

module.exports = {
	//Connexion
	async login(req, res) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			const isMatch = user && (await bcrypt.compare(password, user.password));

			if (!isMatch)
				return res
					.status(HTTP_STATUS_BAD_REQUEST)
					.json({ error: "Identifiants invalides" });

			const payload = {
				id: user._id,
				pseudo: user.pseudo,
				email: user.email,
			};

			generateToken(payload, res);
		} catch (error) {
			console.error(error.message);
			res
				.status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
				.json({ error: "Erreur serveur" });
		}
	},
	// Inscription
	async register(req, res) {
		console.log(req.body);
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

			// Create JWT Payload
			const payload = {
				id: user._id,
				pseudo: user.pseudo,
				email: user.email,
			};

			// Sign Token
			generateToken(payload, res);
		} catch (error) {
			res
				.status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
				.json({ message: error.message });
		}
	},
};
