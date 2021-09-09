import React, { createContext, useReducer } from "react";
import jwt_decode from "jwt-decode";
import UserReducer from "../reducers/UserReducer";

const UserContext = createContext();

const jwtToken = JSON.parse(localStorage.getItem("jwtToken"));
let user = null;

if (jwtToken) {
	const { id, username, email, exp } = jwt_decode(jwtToken);

	// If token isn't expired
	if (Date.now() > exp * 1000) {
		localStorage.removeItem("jwtToken");
	} else {
		user = { id, username, email };
	}
}

const initialState = {
	user: user ? user : null,
	userData: {},
	loggedIn: user ? true : false,
	error: null,
};

const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(UserReducer, initialState);

	const setUserData = (user) => {
		dispatch({ type: "SET_USER_DATA", payload: { user } });
	};

	const login = ({ id, username, email, token }) => {
		// Add token to local storage
		localStorage.setItem("jwtToken", JSON.stringify(token));

		// Set State
		dispatch({ type: "LOGIN", payload: { id, username, email } });
	};

	const logout = () => {
		dispatch({ type: "LOGOUT" });
		localStorage.removeItem("jwtToken");
	};

	return (
		<UserContext.Provider value={{ ...state, setUserData, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
