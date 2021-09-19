import React, { createContext, useEffect, useReducer } from "react";
import { gql, useLazyQuery } from "@apollo/client";
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
	userPrivateData: {},
	userPublicData: {},
	loggedIn: user ? true : false,
};

const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(UserReducer, initialState);

	const [getUserInfoById] = useLazyQuery(GET_USER_INFO_BY_ID, {
		onCompleted: (data) => console.log(data.getUserInfoById),
		onError: (err) => console.log(err),
		fetchPolicy: "cache-and-network",
	});

	const setUserPrivateData = (privateData) => {
		dispatch({ type: "SET_USER_PUBLIC_DATA", payload: { privateData } });
	};

	const setUserPublicData = (publicData) => {
		dispatch({ type: "SET_USER_PUBLIC_DATA", payload: publicData });
	};

	const login = ({ id, username, email, token }) => {
		// Add token to local storage
		localStorage.setItem("jwtToken", JSON.stringify(token));

		// Set State
		dispatch({ type: "LOGIN", payload: { id, username, email } });

		getUserInfoById({ variables: { userId: id } });
	};

	const logout = () => {
		dispatch({ type: "LOGOUT" });
		localStorage.removeItem("jwtToken");
	};

	useEffect(() => {}, []);

	return (
		<UserContext.Provider
			value={{
				...state,
				setUserPublicData,
				setUserPrivateData,
				login,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };

const GET_USER_INFO_BY_ID = gql`
	query getUserInfoById($userId: ID!) {
		getUserInfoById(userId: $userId) {
			id
			email
		}
	}
`;
