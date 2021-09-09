const usersMutationResolvers = require("./usersMutationResolvers");
const usersQueryResolvers = require("./usersQueryResolvers");
const postMutationResolvers = require("./postMutationResolvers");
const postQueryResolvers = require("./postQueryResolvers");
const { GraphQLUpload } = require("graphql-upload");

const resolvers = {
	Upload: GraphQLUpload,
	Post: {
		likeCount: (parent) => parent.likes.length,
		commentCount: (parent) => parent.comments.length,
	},
	Query: {
		...postQueryResolvers.Query,
		...usersQueryResolvers.Query,
	},
	Mutation: {
		...usersMutationResolvers.Mutation,
		...postMutationResolvers.Mutation,
	},
};

module.exports = resolvers;
