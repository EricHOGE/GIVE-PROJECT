const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postController");
// const { verificationPost } = require("../../middleware/postCreateMiddleware");

// Route pour récupérer tous les posts
router.get("/post", postController.getAllPosts);

// Route pour récupérer un post par ID
router.get("/post/:id", postController.getPostById);

// Route pour créer un nouveau post
router.post("/post", postController.createPost);

// Route pour mettre à jour un post par ID
router.put("/post/:id", postController.updatePostById);

// Route pour supprimer un post par ID
router.delete("/post/:id", postController.deletePostById);

module.exports = router;
