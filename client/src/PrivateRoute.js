import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./context/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { loggedIn } = useContext(UserContext);

	return (
		<Route
			{...rest}
			render={(props) =>
				loggedIn ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

export default PrivateRoute;
