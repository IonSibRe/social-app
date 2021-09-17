const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");
const express = require("express");
const dotenv = require("dotenv");

const connectToDB = require("./utils/db");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

// Init
dotenv.config();

async function startServer() {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => ({
			req,
		}),
	});
	await server.start();
	const app = express();

	app.use(express.json({ limit: "50mb" }));
	app.use(graphqlUploadExpress());
	server.applyMiddleware({ app });

	app.listen(4000, () =>
		console.log(
			`Server is running at http://localhost:4000${server.graphqlPath}`
		)
	);
}

startServer();
connectToDB();
