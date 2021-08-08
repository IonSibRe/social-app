const usersResolvers = require("./usersResolvers");

const resolvers = {
	Query: {
		greet: () => "Hello",
	},
	Mutation: {
		...usersResolvers.Mutation,
	},
};

module.exports = resolvers;
