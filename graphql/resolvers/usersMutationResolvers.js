const { UserInputError, ApolloError } = require("apollo-server");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const Post = require("../../models/Post");
const {
	registerValidate,
	loginValidate,
	changePasswordValidate,
} = require("../../utils/validation");
const { genToken, updatePosts } = require("../../utils/utils");
const checkAuth = require("../../utils/checkAuth");
const { cloudinary } = require("../../utils/cloudinary");

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
				followers: 0,
				following: 0,
			});

			// Generate Token
			const token = genToken(newUser);

			// Return User
			return {
				id: newUser._id,
				username: newUser.username,
				email: newUser.email,
				token,
				followers: 0,
				following: 0,
				createdAt: newUser.createdAt,
			};
		},
		async changePassword(_, args, context) {
			const { id } = checkAuth(context);
			const {
				resetPasswordInput: { password, confirmPassword },
			} = args;

			// Validate Data
			const { error: validationError } = changePasswordValidate({
				password,
				confirmPassword,
			});

			if (validationError) {
				const errMsg = validationError.details[0].message;

				throw new UserInputError("ValidationError", {
					errMsg,
				});
			}

			// Get User
			const user = await User.findById(id);
			if (!user) throw new ApolloError("User Not Found");

			// Hash Password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			user.password = hashedPassword;

			await user.save();
			return user;
		},
		async updateUserAuthData(_, { userId, body }, context) {
			checkAuth(context);

			try {
				// Get user and user's posts;
				const user = await User.findById(userId);
				let usersPosts = await Post.find({ username: user.username });

				const { username: newUsername, email: newEmail } = body;

				// Empty fields error check
				if (!newUsername && !newEmail) {
					throw new UserInputError(
						"You must enter at least one field."
					);
				}

				// Username already exists error check
				const existingUsername = await User.findOne({
					username: newUsername,
				});
				if (existingUsername) {
					throw new UserInputError(
						"User with this username already exists"
					);
				}

				// Email already exists error check
				const existingEmail = await User.findOne({
					email: newEmail,
				});
				if (existingEmail) {
					throw new UserInputError(
						"User with this email already exists"
					);
				}

				// Update username and/or email
				if (newUsername) user.username = newUsername;
				if (newEmail) user.email = newEmail;

				// Update posts if user has any
				if (usersPosts.length > 0)
					usersPosts.forEach((post) => (post.username = newUsername));

				// Save user and posts to db
				const updatedUser = await user.save();
				usersPosts.forEach(async (post) => await post.save());

				// Add Token
				updatedUser.token = genToken(updatedUser);

				return updatedUser;
			} catch (err) {
				throw new ApolloError(err);
			}
		},
		async updateUserAdditionalInfo(_, { userId, body }, context) {
			checkAuth(context);

			try {
				const user = await User.findById(userId);

				user.userAdditionalInfo = body;

				await user.save();
				return user;
			} catch (err) {
				throw new ApolloError(err);
			}
		},
		async uploadImage(_, { base64File, imgType, deletePublicId }, context) {
			const { id } = checkAuth(context);

			// Check for imgType
			if (imgType !== "profile-image" && imgType !== "banner") {
				throw new ApolloError(
					"imgType must be: 'profile-image' or 'banner'"
				);
			}

			// Get User
			const user = await User.findById(id);
			if (!user) throw new ApolloError("User Not Found");

			// Delete previous img if there is one
			if (deletePublicId) {
				await cloudinary.uploader.destroy(
					`social-app/${imgType}s/${deletePublicId}`
				);
			}

			// Upload Image
			const uploadedRes = await cloudinary.uploader.upload(base64File, {
				folder: `social-app/${imgType}s`,
				upload_preset: "social-app",
			});

			// Add img link to user
			imgType === "profile-image"
				? (user.profileImg = uploadedRes.secure_url)
				: (user.banner = uploadedRes.secure_url);

			await user.save();
			return user;
		},
	},
};

module.exports = usersMutationResolvers;
