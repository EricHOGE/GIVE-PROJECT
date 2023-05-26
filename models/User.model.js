const { set, Schema, model } = require("mongoose");
const validator = require("validator");
set("strictQuery", true);

const userSchema = Schema(
	{
		pseudo: { type: String, required: true, unique: true },
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			validate(v) {
				if (!validator.isEmail(v)) throw new Error("L'email n'est pas valide");
			},
		},
		dateOfBirth: { type: Date },
		isWaiting: { type: Boolean },
		transplant: { type: String },
		role: { type: String, default: "user" },
		password: {
			type: String,
			required: true,
			validate(v) {
				if (!validator.isStrongPassword(v))
					throw new Error(
						"Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial"
					);
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("User", userSchema);
