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
	profileImg: String,
	userInfo: {
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
