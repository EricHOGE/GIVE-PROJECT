const express = require("express");
const registerController = require("../../controllers/registerController");
const router = express.Router();
const { verificationRegister } = require("../../middleware/registerMiddleware");

router.post("/register", verificationRegister, registerController.register);

module.exports = router;
