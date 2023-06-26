const jwt = require("jsonwebtoken");
const config = require("../config");

exports.authenticate = (req, res, next) => {
	// Récupère le token depuis l'en-tête d'autorisation
	const token = req.headers["authorization"];

	if (!token) {
		return res
			.status(401)
			.json({ message: "Aucun token, autorisation refusée" });
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: "Token invalide" });
		}
		req.userId = decoded.id;
		next();
	});
};
