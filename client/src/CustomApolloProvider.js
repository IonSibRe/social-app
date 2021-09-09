import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createUploadLink({
	uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
	let token = JSON.parse(localStorage.getItem("jwtToken"));
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	cache: new InMemoryCache({
		typePolicies: {
			Post: {
				fields: {
					likes: {
						merge: false,
					},
					comments: {
						merge: false,
					},
				},
			},
		},
	}),
	link: authLink.concat(httpLink),
});

const CustomApolloProvider = ({ children }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default CustomApolloProvider;
