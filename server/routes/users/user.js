const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const { verificationRegister } = require("../../middleware/registerMiddleware");

router.post("/register", verificationRegister, userController.register);

router.delete("/delete/:id", userController.deleteUser);

router.get("/get/:id", userController.getUser);

router.get("/get", userController.getUsers);

router.put("/update/:id", userController.updateUser);

module.exports = router;
