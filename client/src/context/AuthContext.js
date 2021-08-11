import React, { createContext, useEffect, useReducer } from "react";
import jwt_decode from "jwt-decode";
import AuthReducer from "../reducers/AuthReducer";

const AuthContext = createContext();

const jwtToken = JSON.parse(localStorage.getItem("jwtToken"));
let user = null;

if (jwtToken) {
	const { id, username, email, exp } = jwt_decode(jwtToken);

	// If token isn't expired
	if (Date.now() > exp) {
		user = { id, username, email };
	} else {
		localStorage.removeItem("jwtToken");
	}
}

const initialState = {
	user: user ? user : null,
	loggedIn: user ? true : false,
	error: null,
};

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, initialState);

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

	useEffect(() => {
		console.log(state.user);
		console.log(state.loggedIn);
	}, [state.user, state.loggedIn]);

	return (
		<AuthContext.Provider value={{ ...state, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
