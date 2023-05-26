const Post = require("../models/Post.model");

module.exports = {
	// Contrôleur pour récupérer tous les posts
	async getAllPosts(req, res) {
		try {
			const posts = await Post.find();
			posts.sort({ createdAt: -1 });
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
			const { userId, pseudo, title, content, comments, likes } = req.body;
			const post = new Post({
				userId: userId,
				pseudo: pseudo,
				title: title,
				content: content,
				comments: comments,
				likes: likes,
			});
			console.log("post => ", post);

			const newPost = await post.save();
			res.status(201).json({ message: "post created", newPost });
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	// Contrôleur pour mettre à jour un post par ID
	async updatePostById(req, res) {
		try {
			const postId = req.params.id;
			const { userId, pseudo, title, content } = req.body;
			const post = await Post.findById(postId);
			if (!post) {
				return res.status(404).json({ error: "Post not found" });
			}
			post.userId = userId;
			post.pseudo = pseudo;
			post.title = title;
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
