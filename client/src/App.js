import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home, Login, Register, SinglePost } from "./pages";
import Navbar from "./components/Navbar";
import "./scss/main.scss";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route path="/posts/:id" component={SinglePost} />
				<Route path="*" component={ErrorPage} />
			</Switch>
		</Router>
	);
};

export default App;
