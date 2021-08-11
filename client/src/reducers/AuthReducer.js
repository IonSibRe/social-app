const AuthReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload,
				loggedIn: true,
			};

		case "LOGOUT":
			return {
				...state,
				user: {},
				loggedIn: false,
			};

		default:
			throw new Error("No method matched the dispatch");
	}
};

export default AuthReducer;
