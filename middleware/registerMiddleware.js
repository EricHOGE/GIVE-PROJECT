exports.validate = (req, res, next) => {
	// Validate the request data here
	// Example:
	if (
		!req.body.firstname ||
		!req.body.lastname ||
		!req.body.email ||
		!req.body.password
	) {
		return res.status(400).json({ message: "Remplir tous les champs !" });
	}
	next();
};
