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
	userPublicData: {},
	loggedIn: user ? true : false,
};

const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(UserReducer, initialState);

	const setUser = (updatedUser) => {
		localStorage.setItem("jwtToken", JSON.stringify(updatedUser.token));

		delete updatedUser.token;
		dispatch({ type: "SET_USER", payload: updatedUser });
	};

	const setUserPublicData = (publicData) => {
		dispatch({ type: "SET_USER_PUBLIC_DATA", payload: publicData });
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
		window.location.reload();
	};

	return (
		<UserContext.Provider
			value={{
				...state,
				setUser,
				setUserPublicData,
				login,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
