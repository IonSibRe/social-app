const usersResolvers = require("./usersResolvers");
const postMutationResolvers = require("./postMutationResolvers");
const postQueryResolvers = require("./postQueryResolvers");

const resolvers = {
	Post: {
		likeCount: (parent) => parent.likes.length,
		commentCount: (parent) => parent.comments.length,
	},
	Query: {
		...postQueryResolvers.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...postMutationResolvers.Mutation,
	},
};

module.exports = resolvers;
