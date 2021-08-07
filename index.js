const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
	type Post {
		id: ID!
		title: String!
		body: String!
	}

	type Query {
		posts: [Post]
	}
`;

const posts = [
	{
		id: 1,
		title: "First Post",
		body: "Lorem ipsum dolor",
	},
	{
		id: 2,
		title: "Second Post",
		body: "Lorem ipsum dolor",
	},
];

const resolvers = {
	Query: {
		posts: () => posts,
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server is running at: ${url}`));
