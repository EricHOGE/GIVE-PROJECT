const mongoose = require("mongoose");
const Message = require("../models/Message.model");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
	// Récupérer tous les messages d'un utilisateur
	async getMessages(req, res) {
		const { userId } = req.params;
		console.log("userId => ", userId);

		// Récupérer le token à partir des en-têtes de la requête
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).json({ message: "Aucun token fourni" });
		}
		const token = authHeader.split(" ")[1];

		try {
			// Vérifier et décoder le token
			const decodedToken = jwt.verify(token, config.secret);

			// Récupérer l'ID de l'utilisateur connecté
			const connectedUserId = decodedToken.id;
			console.log("connectedUserId => ", connectedUserId);

			// Récupérer les messages entre les deux utilisateurs et les trier par date
			const messages = await Message.find({
				sender: { $in: [userId, connectedUserId] },
				recipient: { $in: [userId, connectedUserId] },
			}).sort({ createdAt: 1 });

			return res.status(200).json(messages);
		} catch (err) {
			// Gérer toute erreur (token invalide, erreur de base de données, etc.)
			console.error(err);
			return res
				.status(500)
				.json({
					message:
						"Échec de l'authentification du token ou de la récupération des messages",
				});
		}
	},
};
