const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postController");
// const { verificationPost } = require("../../middleware/postCreateMiddleware");

router
	.route("/")
	.get(postController.getAllPosts) // Route pour récupérer tous les posts
	.post(postController.createPost); // Route pour créer un nouveau post

router
	.route("/:id")
	.get(postController.getPostById) // Route pour récupérer un post par ID
	.put(postController.updatePostById) // Route pour mettre à jour un post par ID
	.delete(postController.deletePostById); // Route pour supprimer un post par ID

module.exports = router;
