const checkAuth = require("../../utils/checkAuth");
const User = require("../../models/User");

const usersQueryResolvers = {
	Query: {
		async getUserInfoById(_, { userId }, context) {
			checkAuth(context);

			try {
				const user = await User.findById(userId);
				if (!user) throw new ApolloError("User Not Found");

				return user;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getUserInfoByUsername(_, { username }) {
			try {
				const user = await User.findOne({ username });
				if (!user) throw new ApolloError("User Not Found");

				return user;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

module.exports = usersQueryResolvers;
