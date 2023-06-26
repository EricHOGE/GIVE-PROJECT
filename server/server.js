require("dotenv").config();

const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const socketIO = require("socket.io");

const server = http.createServer(app);

const io = socketIO(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

// MongoDB
const dbUrl = process.env.DB_URL;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.set("strictQuery", true);
mongoose.connect(
	"mongodb://" + dbUrl,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) {
			// console.error à effacer en production
			console.error("Erreur de connexion à MongoDB : ", err);
			process.exit(1);
		}
		console.log("Connexion à MongoDB établie avec succès");
		// Lancer le serveur une fois que la connexion à MongoDB a été établie
		const port = 8080;
		server.listen(port, () => {
			console.log("Serveur lancé sur le port", port);
		});
	}
);

io.on("connection", (socket) => {
	console.log("Un utilisateur s'est connecté:", socket.id);

	// Écouter l'événement 'message' et envoyer le message à tous les clients
	socket.on("message", (data) => {
		io.emit("message", data);
	});

	// Gérer la déconnexion
	socket.on("disconnect", () => {
		console.log("Un utilisateur s'est déconnecté:", socket.id);
	});
});
