import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

const client = new ApolloClient({
	uri: "http://localhost:4000/",
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
