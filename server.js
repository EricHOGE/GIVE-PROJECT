const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const socketIO = require("socket.io");

const server = http.createServer(app);

// MongoDB
const dbUrl = "127.0.0.1:27017/give";
mongoose.set("strictQuery", true);
mongoose.connect(
	"mongodb://" + dbUrl,
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
		// Lancer le serveur une fois que la connexion à MongoDB a été établie
		const port = 8080;
		server.listen(port, () => {
			console.log("Serveur lancé sur le port", port);
		});
	}
);

// const io = socketIO(server, {
// 	cors: {
// 		origin: "http://localhost:3000",
// 		methods: ["GET", "POST"],
// 	},
// });

// // Écouter les connexions des clients
// io.on("connection", (socket) => {
// 	console.log("Un utilisateur s'est connecté");
// 	socket.on("disconnect", () => {
// 		console.log("Utilisateur déconnecté");
// 	});
// 	// Écouter les événements du chat
// 	socket.on("chatMessage", (message) => {
// 		console.log(`Message reçu : ${message}`);
// 		// Émettre le message à tous les clients connectés
// 		io.emit("chatMessage", message);
// 	});
// });

// // Démarrer le serveur socket
// const portSocket = 3000;
// server.listen(portSocket, () => {
// 	console.log(`Le serveur est démarré sur le port ${port}`);
// });
