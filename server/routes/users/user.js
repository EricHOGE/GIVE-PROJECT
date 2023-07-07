const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const authController = require("../../controllers/authController");
const { verificationRegister } = require("../../middleware/registerMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.post("/login", authController.login);

router.post("/register", verificationRegister, authController.register);

router.delete("/delete/:id", userController.deleteUser);

router.get("/getuser", authMiddleware, userController.getUser);

router.get("/getusers", authMiddleware, userController.getUsers);

router.put("/update/:id", userController.updateUser);

module.exports = router;
