const { check, validationResult } = require("express-validator");

module.exports = {
	verificationLogin: [
		check("email").isEmail().withMessage("Email est invalide").normalizeEmail(),
		check("password").notEmpty().withMessage("Mot de passe est requis"),
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			next();
		},
	],
};
