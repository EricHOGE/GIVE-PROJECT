const { Schema, model } = require("mongoose");
const User = require("./User.model.js");

const likeSchema = Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		pseudo: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

likeSchema.pre("save", async function (next) {
	try {
		const user = await User.findById(this.userId);
		if (user) {
			this.pseudo = user.pseudo;
		}
		next();
	} catch (error) {
		next(error);
	}
});

module.exports = model("Like", likeSchema);
