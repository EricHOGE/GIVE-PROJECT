const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const postSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		pseudo: {
			type: String,
			required: true,
		},
		titre: {
			type: String,
		},
		content: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		comment: {
			type: [String],
			default: [],
		},
		like: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		collection: "post",
	}
);

module.exports = mongoose.model("Post", postSchema);
