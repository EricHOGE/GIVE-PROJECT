const app = require("./app");
const http = require("http");
const server = http.createServer(app);

const mongoose = require("mongoose");

const url = "";
mongoose.connect(
	"mongodb://127.0.0.1:27017/give",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log("connected to mongoDb");
	}
);

const port = 8080;
server.listen(port, function () {
	console.log("connecting port 8080");
});
