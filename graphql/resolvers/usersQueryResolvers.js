const checkAuth = require("../../utils/checkAuth");
const User = require("../../models/User");
const { ApolloError } = require("apollo-server-errors");

const usersQueryResolvers = {
	Query: {
		async getUserInfoById(_, { userId }, context) {
			checkAuth(context);

			try {
				const user = await User.findById(userId);
				if (!user) throw new ApolloError("User Not Found");

				return user;
			} catch (err) {
				throw new ApolloError(err);
			}
		},
		async getUserInfoByUsername(_, { username }) {
			try {
				const user = await User.findOne({ username });
				if (!user) throw new ApolloError("User Not Found");

				return user;
			} catch (err) {
				throw new ApolloError(err);
			}
		},
		async getUsersByUsername(_, { username }) {
			try {
				const findUsersRegex = new RegExp(`${username}`, "i");
				const users = await User.find({
					username: { $regex: findUsersRegex },
				});
				if (!users) throw new ApolloError("No user was found");

				return users;
			} catch (err) {
				throw new ApolloError(err);
			}
		},
	},
};

module.exports = usersQueryResolvers;
