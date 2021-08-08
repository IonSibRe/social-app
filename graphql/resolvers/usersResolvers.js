const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const { registerValidate, loginValidate } = require("../../utils/validation");

const genToken = ({ _id: id, username, email }) => {
	return jwt.sign(
		{
			id,
			username,
			email,
		},
		process.env.JWT_KEY,
		{ expiresIn: "1d" }
	);
};

const userResolvers = {
	Mutation: {
		async login(_, args) {
			// Get Data
			const {
				loginInput: { email, password },
			} = args;

			// Validate Data
			const { error: validationError } = loginValidate({
				email,
				password,
			});

			if (validationError) throw new UserInputError(validationError);

			// Check if user exists
			const user = await User.findOne({ email });
			if (!user) throw new UserInputError("Invalid Credentials");

			// Compare Password
			const validPassword = await bcrypt.compare(password, user.password);
			if (!validPassword) throw new UserInputError("Invalid Credentials");

			// Generate Token
			const token = genToken(user);

			// Return User
			return {
				id: user._id,
				username: user.username,
				email: user.email,
				token,
				createdAt: user.createdAt,
			};
		},

		async register(_, args) {
			// Get Data
			const {
				registerInput: { username, password, confirmPassword, email },
			} = args;

			// Validate Data
			const { error: validationError } = registerValidate({
				username,
				password,
				confirmPassword,
				email,
			});

			if (validationError) throw new UserInputError(validationError);

			// Check if user doesn't already exist
			const user = await User.findOne({ email });
			if (user)
				throw new UserInputError(
					"User with this email already exists "
				);

			// Hash Password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			// Register User
			const newUser = await User.create({
				username,
				password: hashedPassword,
				email,
			});

			// Generate Token
			const token = genToken(newUser);

			// Return User
			return {
				id: newUser._id,
				username: newUser.username,
				email: newUser.email,
				token,
				createdAt: newUser.createdAt,
			};
		},
	},
};

module.exports = userResolvers;
