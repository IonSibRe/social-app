const { gql } = require("apollo-server-express");

const typeDefs = gql`
	scalar Upload

	# Auth
	type User {
		id: ID!
		username: String!
		email: String!
		token: String
		description: String
		profileImg: String
		banner: String
		followers: [String]!
		followersCount: Int!
		following: [String]!
		followingCount: Int!
		createdAt: String!
		userAdditionalInfo: UserAdditionalInfo
	}

	input UserAuthDataInput {
		username: String
		email: String
	}

	type UserAdditionalInfo {
		firstName: String
		lastName: String
		phoneNumber: String
		country: String
		birthDate: String
		profession: String
		company: String
	}

	input UserAdditionalInfoInput {
		firstName: String
		lastName: String
		phoneNumber: String
		country: String
		birthDate: String
		profession: String
		company: String
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

	input ResetPasswordInput {
		password: String!
		confirmPassword: String!
	}

	# Posts
	type Post {
		id: ID!
		username: String!
		body: String!
		img: String
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

	# Queries
	type Query {
		getAllPosts: [Post]!
		getUsersPosts: [Post]!
		getPost(postId: ID!): Post!
		getUserInfoById(userId: ID!): User!
		getUserInfoByUsername(username: String!): User!
		getUsersByUsername(username: String!): [User]!
	}

	# Mutations
	type Mutation {
		login(loginInput: LoginInput!): User!
		register(registerInput: RegisterInput!): User!
		changePassword(resetPasswordInput: ResetPasswordInput!): User!
		followUser(currentUser: String!, userToFollow: String!): User
		uploadImage(
			base64File: String!
			imgType: String!
			deletePublicId: ID
		): User!
		updateUserAuthData(userId: ID!, body: UserAuthDataInput!): User!
		updateUserAdditionalInfo(
			userId: ID!
			body: UserAdditionalInfoInput
		): User!
		createPost(body: String!): Post!
		deletePost(postId: ID!): Post!
		likePost(postId: ID!): Post!
		createComment(postId: ID!, body: String!): Post!
		deleteComment(postId: ID!, commentId: ID!): Post!
	}
`;

module.exports = typeDefs;
