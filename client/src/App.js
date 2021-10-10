import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
	Home,
	Login,
	Register,
	SinglePost,
	ErrorPage,
	Profile,
	UserPage,
} from "./pages";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/Navbar";
import "./scss/main.scss";

const App = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/posts/:id" component={SinglePost} />
				<Route exact path="/users/:username" component={UserPage} />
				<PrivateRoute path="/profile" component={Profile} />
				<Route path="*" component={ErrorPage} />
			</Switch>
		</Router>
	);
};

export default App;
