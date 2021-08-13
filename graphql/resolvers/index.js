const usersResolvers = require("./usersResolvers");
const postMutationResolvers = require("./postMutationResolvers");
const postQueryResolvers = require("./postMutationResolvers");

const resolvers = {
	Query: {
		...postQueryResolvers.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...postMutationResolvers.Mutation,
	},
};

module.exports = resolvers;
