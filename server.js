const app = require("./app");
const http = require("http");
const server = http.createServer(app);

const mongoose = require("mongoose");

mongoose.connect(
	"mongodb://root:example@localhost:27017/give?authSource=admin",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log("connected to mongoDb");
	}
);

const port = 3000;
server.listen(port, function () {
	console.log("connecting port 3000");
});
