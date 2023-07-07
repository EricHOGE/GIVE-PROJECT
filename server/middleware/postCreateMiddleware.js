module.exports = {
	verificationCreatePost(req, res, next) {
		console.log(req.body);
		if (
			!req.body.userId ||
			!req.body.pseudo ||
			!req.body.title ||
			!req.body.content
		) {
			return res.status(401).json({ message: "Remplir tous les champs !" });
		} else {
			next();
		}
	},
};
