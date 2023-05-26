const { set, Schema, model } = require("mongoose");
const User = require("./User.model.js");
set("strictQuery", true);

const postSchema = Schema(
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
		title: {
			type: String,
		},
		content: {
			type: String,
			required: true,
		},
		comment: {
			type: Schema.Types.ObjectId,
			ref: "Comment",
			default: [],
		},
		likes: {
			type: Schema.Types.ObjectId,
			ref: "Like",
			default: [],
		},
	},
	{
		timestamps: true,
	}
);
postSchema.pre("save", async function (next) {
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

// postSchema.virtual("likesCount").get(function () {
// 	return this.likes.length;
// });

module.exports = model("Post", postSchema);
