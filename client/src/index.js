import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import CustomApolloProvider from "./CustomApolloProvider";

ReactDOM.render(
	<React.StrictMode>
		<CustomApolloProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</CustomApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
