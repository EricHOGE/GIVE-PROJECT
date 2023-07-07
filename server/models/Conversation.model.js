const { Schema, model } = require("mongoose");

const ConversationSchema = Schema(
	{
		participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
	},
	{
		timestamps: true,
	}
);

module.exports = model("Conversation", ConversationSchema);
