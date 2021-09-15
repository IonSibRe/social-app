const checkAuth = require("../../utils/checkAuth");
const User = require("../../models/User");

const usersQueryResolvers = {
	Query: {
		async getUserInfo(_, { userId }, context) {
			checkAuth(context);

			try {
				const user = await User.findById(userId);
				if (!user) throw new ApolloError("User Not Found");

				return user;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getUserCardInfo(_, { username }) {
			try {
				const user = await User.find({ username });
				if (!user) throw new ApolloError("User Not Found");

				return user[0];
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

module.exports = usersQueryResolvers;
