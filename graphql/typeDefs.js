const { gql } = require("apollo-server");

const typeDefs = gql`
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

	type Query {
		greet: String!
	}

	type Mutation {
		login(loginInput: LoginInput!): User!
		register(registerInput: RegisterInput): User!
	}
`;

module.exports = typeDefs;
