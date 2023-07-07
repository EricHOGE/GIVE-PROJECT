// server.js
require("dotenv").config();

const app = require("./app");
const http = require("http");
const server = http.createServer(app);

// Model mongoose pour les messages
const Message = require("./models/Message.model");

// MongoDB
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbUrl = process.env.DB_URL;

const mongoose = require("mongoose");
const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbUrl}`;

mongoose.set("strictQuery", true);
mongoose.connect(
	connectionString,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) {
			console.error("Erreur de connexion à MongoDB : ", err);
			process.exit(1);
		}
		console.log("Connexion à MongoDB établie avec succès");
		const port = 8000;
		server.listen(port, () => {
			console.log("Serveur lancé sur le port", port);

			// WebSocket
			const jwt = require("jsonwebtoken");
			const config = require("./config");
			const ws = require("ws");
			const wss = new ws.WebSocketServer({ server });
			wss.on("connection", (connection, req) => {
				function notifyAboutOnlinePeople() {
					[...wss.clients].forEach((client) => {
						client.send(
							JSON.stringify({
								online: [...wss.clients].map((c) => ({
									id: c.id,
									pseudo: c.pseudo,
								})),
							})
						);
					});
				}

				// vérifie que la connexion est toujours active
				connection.isAlive = true;
				connection.timer = setInterval(() => {
					connection.ping();
					connection.deathTimer = setTimeout(() => {
						connection.isAlive = false;
						connection.terminate();
						notifyAboutOnlinePeople();
					}, 1000);
				}, 5000);

				connection.on("pong", () => {
					clearTimeout(connection.deathTimer);
				});

				// récupère le token dans l'URL
				const url = new URL(req.url, `http://${req.headers.host}`);
				const token = url.searchParams.get("token");
				if (token) {
					jwt.verify(
						token,
						config.secret,
						{ expiresIn: "1d" },
						(err, userData) => {
							if (err) {
								console.log("Token verification failed:", err);
							} else {
								const { id, pseudo } = userData;
								connection.id = id;
								connection.pseudo = pseudo;
							}
						}
					);
				}

				// envoie la liste des membres connectés à tous les membres
				connection.on("message", async (message) => {
					const messageData = JSON.parse(message.toString());
					const { recipient, text } = messageData;
					if (recipient && text) {
						const messageDoc = await Message.create({
							sender: connection.id,
							recipient,
							text,
						});
						[...wss.clients]
							.filter((c) => c.id === recipient)
							.forEach((c) =>
								c.send(
									JSON.stringify({
										text,
										sender: connection.id,
										recipient,
										_id: messageDoc._id,
									})
								)
							);
					}
				});
				notifyAboutOnlinePeople();
			});
		});
	}
);
