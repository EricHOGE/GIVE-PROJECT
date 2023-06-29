// server.js
require("dotenv").config();

const app = require("./app");
const http = require("http");
const { connect } = require("http2");
const mongoose = require("mongoose");

const server = http.createServer(app);

// MongoDB
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbUrl = process.env.DB_URL;

mongoose.set("strictQuery", true);
mongoose.connect(
	"mongodb+srv://giveproject:PznUsdfBgTLX3mx8@cluster0.2seul0w.mongodb.net/",
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
			});
		});
	}
);
