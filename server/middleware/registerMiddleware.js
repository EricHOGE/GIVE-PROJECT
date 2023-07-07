const { check, validationResult } = require("express-validator");
const User = require("../models/User.model");

module.exports = {
	verificationRegister: [
		check("firstname")
			.notEmpty()
			.withMessage("Prénom est requis")
			.isLength({ min: 2 })
			.withMessage("Prénom doit contenir au moins 2 caractères")
			.matches(/^[a-zA-ZÀ-ÿ\s]*$/)
			.withMessage("Prénom ne doit contenir que des lettres"),
		check("lastname")
			.notEmpty()
			.withMessage("Nom est requis")
			.isLength({ min: 2 })
			.withMessage("Nom doit contenir au moins 2 caractères")
			.matches(/^[a-zA-ZÀ-ÿ\s]*$/)
			.withMessage("Nom ne doit contenir que des lettres"),
		check("email").isEmail().withMessage("Email est invalide").normalizeEmail(),
		check("password")
			.isLength({ min: 8 })
			.withMessage("Mot de passe doit contenir au moins 8 caractères")
			.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
			.withMessage(
				"Mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
			),
		check("pseudo")
			.notEmpty()
			.withMessage("Pseudo est requis")
			.isLength({ min: 3 })
			.withMessage("Pseudo doit contenir au moins 3 caractères")
			.custom(async (value) => {
				try {
					const user = await User.findOne({ pseudo: value });
					if (user) {
						return Promise.reject("Pseudo déjà utilisé");
					}
				} catch (err) {
					throw new Error("Erreur serveur");
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
