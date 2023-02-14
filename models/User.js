const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		match:
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	},
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);

/* const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User; */
