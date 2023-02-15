const express = require("express");
const app = express();

const registerRoute = require("./routes/users/register");
const loginRoute = require("./routes/users/login");

app.use(express.json());

app.use("/", registerRoute);
app.use("/", loginRoute);

module.exports = app;
