const mongoose = require("mongoose");
const Post = require("../models/Post");

module.exports = {
	// Contrôleur pour récupérer tous les posts
	async getAllPosts(req, res) {
		try {
			const posts = await Post.find();
			res.json(posts);
		} catch (err) {
			res.status(500).json({ error: "Failed to get posts" });
		}
	},

	// Contrôleur pour récupérer un post par ID
	async getPostById(req, res) {
		try {
			const postId = req.params.id;
			const post = await Post.findById(postId);
			if (!post) {
				return res.status(404).json({ error: "Post not found" });
			}
			res.json(post);
		} catch (err) {
			res.status(500).json({ error: "Failed to get post" });
		}
	},

	// Contrôleur pour créer un nouveau post
	async createPost(req, res) {
		try {
			const { userId, pseudo, titre, content, comment, like } = req.body;
			const post = new Post({
				_id: new mongoose.Types.ObjectId(),
				userId: userId,
				pseudo: pseudo,
				titre: titre,
				content: content,
				comment: comment,
				like: like,
			});
			console.log("post => ", post);

			await post.save();
			res.status(201).json({ message: "post created" });
			
		} catch (err) {
			res.status(500).json({ error: "Failed to create post" });
		}
	},

	// Contrôleur pour mettre à jour un post par ID
	async updatePostById(req, res) {
		try {
			const postId = req.params.id;
			const { userId, pseudo, titre, content } = req.body;
			const post = await Post.findById(postId);
			if (!post) {
				return res.status(404).json({ error: "Post not found" });
			}
			post.userId = userId;
			post.pseudo = pseudo;
			post.titre = titre;
			post.content = content;
			const updatedPost = await post.save();
			res.json(updatedPost);
		} catch (err) {
			res.status(500).json({ error: "Failed to update post" });
		}
	},

	// Contrôleur pour supprimer un post par ID
	async deletePostById(req, res) {
		try {
			const postId = req.params.id;
			const post = await Post.findById(postId);
			if (!post) {
				return res.status(404).json({ error: "Post not found" });
			}
			await post.remove();
			res.json({ message: "Post deleted successfully" });
		} catch (err) {
			res.status(500).json({ error: "Failed to delete post" });
		}
	},
};
