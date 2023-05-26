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
				if (!validator.isLenght(v, { min: 8, max: 20 }))
					throw new Error(
						"La longueur du mot de passe doit être comprise entre 8 et 20 caractères"
					);
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("User", userSchema);
