const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
	{
		conversation: {
			type: Schema.Types.ObjectId,
			ref: "Conversation",
			required: true,
		},
		sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
		text: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

module.exports = model("Message", MessageSchema);
