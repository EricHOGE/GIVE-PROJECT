const express = require("express");
const app = express();
const cors = require("cors");

const userRoute = require("./routes/users/user");
const postRoute = require("./routes/post/post");
const messagesRoute = require("./routes/messages/messages");

app.use(
	cors({
		origin: "http://localhost:5173",
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoute);
app.use("/api/post", postRoute);
app.use("/api/messages", messagesRoute);

module.exports = app;
