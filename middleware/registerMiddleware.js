const { check, validationResult } = require("express-validator");
const User = require("../models/User.model");

module.exports = {
	verificationRegister: [
		check("firstname").notEmpty().withMessage("Prénom est requis"),
		check("lastname").notEmpty().withMessage("Nom est requis"),
		check("email").isEmail().withMessage("Email est invalide"),
		check("password")
			.isLength({ min: 8 })
			.withMessage("Mot de passe doit contenir au moins 8 caractères"),
		check("pseudo")
			.notEmpty()
			.isLength({ min: 3 })
			.withMessage("Pseudo doit contenir au moins 3 caractères")
			.custom(async (value) => {
				const user = await User.findOne({ pseudo: value });
				if (user) {
					return Promise.reject("Pseudo déjà utilisé");
				}
			}),
		check("dateOfBirth")
			.optional()
			.isISO8601()
			.withMessage("Date de naissance doit être une date valide"),
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			next();
		},
	],
};
