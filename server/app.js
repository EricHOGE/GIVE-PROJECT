const express = require("express");
const app = express();

const userRoute = require("./routes/users/user");
const loginRoute = require("./routes/users/login");
const postRoute = require("./routes/post/post");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoute);
app.use("/", loginRoute);
app.use("/post", postRoute);

module.exports = app;
