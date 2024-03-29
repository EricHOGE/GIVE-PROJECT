const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
	async authMiddleware(req, res, next) {
		// Récupère le token depuis l'en-tête d'autorisation
		const rawToken = req.headers["authorization"];
		if (!rawToken) return errorHandler(res, { code: 401 });
		const token = rawToken.split(" ")[1];

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

		/*
		// Vérifie que le token est valide
		if valide {
			// Récupère l'utilisateur depuis la base de données
			// Ajoute l'utilisateur à la requête
			// req.user = user;  
			next();
		} else {
			// Token invalide
			res.status(401).json({ message: "Token invalide" });
		}
	*/
	},
};
