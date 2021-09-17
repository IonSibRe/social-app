const { gql } = require("apollo-server-express");

const typeDefs = gql`
	scalar Upload

	# Auth
	type User {
		id: ID!
		username: String!
		email: String!
		token: String
		profileImg: String
		userInfo: UserInfo
		createdAt: String!
	}

	type UserInfo {
		firstName: String
		lastName: String
		phoneNumber: String
		country: String
		birthDate: String
		profession: String
		company: String
	}

	input UserInfoInput {
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

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}

	type Query {
		getPosts: [Post]
		getPost(postId: ID!): Post
		getUserInfoById(userId: ID!): User!
		getUserInfoByUsername(username: String!): User!
	}

	type Mutation {
		login(loginInput: LoginInput!): User!
		register(registerInput: RegisterInput!): User!
		uploadProfileImage(base64File: String!): User!
		updateUserInfo(userId: ID!, body: UserInfoInput): User!
		createPost(body: String!): Post!
		deletePost(postId: ID!): Post!
		likePost(postId: ID!): Post!
		createComment(postId: ID!, body: String!): Post!
		deleteComment(postId: ID!, commentId: ID!): Post!
	}
`;

module.exports = typeDefs;
