const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const { registerValidate, loginValidate } = require("../../utils/validation");
const { genToken, streamToBase64 } = require("../../utils/utils");
const checkAuth = require("../../utils/checkAuth");

const usersMutationResolvers = {
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

			if (validationError) {
				const errMsg = validationError.details[0].message;

				throw new UserInputError("ValidationError", {
					errMsg,
				});
			}

			// Check if user exists
			const user = await User.findOne({ email });
			if (!user)
				throw new UserInputError("InvalidCredentials", {
					errMsg: "Invalid Credentials",
				});

			// Compare Password
			const validPassword = await bcrypt.compare(password, user.password);
			if (!validPassword)
				throw new UserInputError("InvalidCredentials", {
					errMsg: "Invalid Credentials",
				});

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

			if (validationError) {
				const errMsg = validationError.details[0].message;

				throw new UserInputError("ValidationError", {
					errMsg,
				});
			}

			// Check if email doesn't already exist
			const user = await User.findOne({ email });
			if (user)
				throw new UserInputError("InputError", {
					errMsg: "User with this email already exists",
				});

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
		async updateUserInfo(_, { userId, body }) {
			try {
				const user = await User.findById(userId);

				user.userInfo = body;

				await user.save();
				return user;
			} catch (err) {
				throw new Error(err);
			}
		},

		async uploadProfileImage(_, { file }, context) {
			const { id } = checkAuth(context);
			const { createReadStream } = await file;

			const base64file = await streamToBase64(createReadStream());

			const user = await User.findById(id);
			if (!user) throw new ApolloError("User Not Found");

			user.profileImg = base64file;

			console.log(user.token);

			await user.save();
			return user;
		},
	},
};

module.exports = usersMutationResolvers;
