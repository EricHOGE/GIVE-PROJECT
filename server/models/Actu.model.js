const { Schema, model } = require("mongoose");

const actuSchema = Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("Actu", actuSchema);
