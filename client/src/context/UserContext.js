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
	userData: {},
	loggedIn: user ? true : false,
	error: null,
};

const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(UserReducer, initialState);

	const [getUserInfo, { called }] = useLazyQuery(GET_USER_INFO, {
		onCompleted: (data) => setUserData(data.getUserInfo),
		onError: (err) => console.log(err),
		fetchPolicy: "cache-and-network",
	});

	const setUserData = (user) => {
		dispatch({ type: "SET_USER_DATA", payload: { user } });
	};

	const login = ({ id, username, email, token }) => {
		// Add token to local storage
		localStorage.setItem("jwtToken", JSON.stringify(token));

		// Set State
		dispatch({ type: "LOGIN", payload: { id, username, email } });

		getUserInfo({ variables: { userId: id } });
	};

	const logout = () => {
		dispatch({ type: "LOGOUT" });
		localStorage.removeItem("jwtToken");
	};

	useEffect(() => {
		if (state.user && Object.keys(state.user).length !== 0) {
			getUserInfo({ variables: { userId: state.user.id } });
		}
	}, [state.user, state.loggedIn, getUserInfo, called]);

	return (
		<UserContext.Provider value={{ ...state, setUserData, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };

const GET_USER_INFO = gql`
	query getUserInfo($userId: ID!) {
		getUserInfo(userId: $userId) {
			id
			username
			email
			token
			profileImg
			userInfo {
				firstName
				lastName
				phoneNumber
				country
				birthDate
				profession
				company
			}
			createdAt
		}
	}
`;
