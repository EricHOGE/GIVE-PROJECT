module.exports = {
	verificationRegister(req, res, next) {
		console.log(req.body);
		if (
			!req.body.firstname ||
			!req.body.lastname ||
			!req.body.email ||
			!req.body.password
		) {
			return res.status(401).json({ message: "Remplir tous les champs !" });
		} else {
			next();
		}
	},
};
