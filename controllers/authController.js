const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const config = require("../config");

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ error: "Utilisateur non trouvé" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ error: "Mot de passe incorrect" });

		const payload = {
			id: user._id,
			pseudo: user.pseudo,
			email: user.email,
		};
		jwt.sign(payload, config.secret, { expiresIn: "1d" }, (err, token) => {
			if (err) throw err;
			res.json({ token });
			console.log(token);
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Erreur serveur");
	}
};
