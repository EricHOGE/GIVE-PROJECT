const mongoose = require("mongoose");
const Message = require("../models/Message.model");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
	// GET all messages from a user
	async getMessages(req, res) {
		const { userId } = req.params;
		console.log("userId => ", userId);

		// Get the token from the request headers
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).json({ message: "No token provided" });
		}
		const token = authHeader.split(" ")[1];

		try {
			// Verify and decode the token
			const decodedToken = jwt.verify(token, config.secret);

			// Get the connected user's ID
			const connectedUserId = decodedToken.id;
			console.log("connectedUserId => ", connectedUserId);

			// Fetch messages between the two users and sort them by date
			const messages = await Message.find({
				sender: { $in: [userId, connectedUserId] },
				recipient: { $in: [userId, connectedUserId] },
			}).sort({ createdAt: 1 });

			return res.status(200).json(messages);
		} catch (err) {
			// Handle any error (invalid token, database error, etc.)
			console.error(err);
			return res
				.status(500)
				.json({ message: "Failed to authenticate token or retrieve messages" });
		}
	},
};
