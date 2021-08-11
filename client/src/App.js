import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home, Login, Register } from "./pages";
import Navbar from "./components/Navbar";
import "./scss/main.scss";

const App = () => {
	return (
		<Router>
			<Navbar />
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
		</Router>
	);
};

export default App;
