import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { UserProvider } from "./context/UserContext";
import CustomApolloProvider from "./CustomApolloProvider";

ReactDOM.render(
	<React.StrictMode>
		<CustomApolloProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</CustomApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
