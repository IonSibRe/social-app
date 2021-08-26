const { gql } = require("apollo-server");

const typeDefs = gql`
	# Auth
	type User {
		id: ID!
		username: String!
		email: String!
		token: String!
		createdAt: String!
	}

	input LoginInput {
		email: String!
		password: String!
	}

	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}

	# Posts
	type Post {
		id: ID!
		username: String!
		body: String!
		commentCount: Int!
		comments: [Comment]!
		likeCount: Int!
		likes: [Like]!
		createdAt: String!
	}

	type Comment {
		id: ID!
		username: String!
		body: String!
		createdAt: String!
	}

	type Like {
		id: ID!
		username: String!
		createdAt: String!
	}

	type Query {
		getPosts: [Post]
		getPost(postId: ID!): Post
	}

	type Mutation {
		login(loginInput: LoginInput!): User!
		register(registerInput: RegisterInput): User!
		createPost(body: String!): Post!
		deletePost(postId: ID!): Post!
		likePost(postId: ID!): Post!
		createComment(postId: ID!, body: String!): Post!
		deleteComment(postId: ID!, commentId: ID!): Post!
	}
`;

module.exports = typeDefs;
