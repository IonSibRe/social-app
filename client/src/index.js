import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import App from "./App";
import { UserProvider } from "./context/UserContext";
import CustomApolloProvider from "./CustomApolloProvider";
import theme from "./customMuiTheme";

ReactDOM.render(
	<React.StrictMode>
		<CustomApolloProvider>
			<UserProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<App />
				</ThemeProvider>
			</UserProvider>
		</CustomApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
