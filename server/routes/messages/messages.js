const express = require("express");
const router = express.Router();
const messageController = require("../../controllers/messageController");
// const { authMiddleware } = require("../../middleware/authMiddleware");

// récupérer tous les messages d'un utilisateur
router.get("/:userId", messageController.getMessages);

module.exports = router;
