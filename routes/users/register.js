const express = require("express");
const registerController = require("../../controllers/registerController");
const router = express.Router();
const registerMiddleware = require("../../middleware/registerMiddleware");

router.post(
	"/register",
	registerMiddleware.validate,
	registerController.register
);

module.exports = router;
