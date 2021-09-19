const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	description: String,
	profileImg: String,
	followers: {
		type: Number,
		required: true,
	},
	following: {
		type: Number,
		required: true,
	},

	userAdditionalInfo: {
		firstName: String,
		lastName: String,
		phoneNumber: String,
		country: String,
		birthDate: String,
		profession: String,
		company: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const User = mongoose.model("User", userSchema);
module.exports = User;
