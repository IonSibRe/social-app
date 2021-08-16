const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

// Init
dotenv.config();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({
		req,
	}),
});

server.listen().then(({ url }) => console.log(`Server is running at: ${url}`));

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to DB..."));
