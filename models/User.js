const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const userSchema = mongoose.Schema(
	{
		pseudo: { type: String, required: true },
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		dateOfBirth: { type: Date },
		isWaiting: { type: Boolean },
		transplant: { type: String },
		role: { type: String, default: "user" },
		password: { type: String, required: true },
		createdAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
		collection: "user",
	}
);

module.exports = mongoose.model("User", userSchema);
