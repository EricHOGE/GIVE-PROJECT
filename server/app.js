const express = require("express");
const app = express();
const cors = require("cors");

const userRoute = require("./routes/users/user");
const postRoute = require("./routes/post/post");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoute);
app.use("/api/post", postRoute);

module.exports = app;
