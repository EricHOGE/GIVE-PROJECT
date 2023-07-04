const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
	{
		sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
		recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
		text: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

module.exports = model("Message", MessageSchema);
