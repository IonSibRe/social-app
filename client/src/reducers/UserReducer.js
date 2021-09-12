const UserReducer = (state, action) => {
	switch (action.type) {
		case "SET_USER_DATA":
			return {
				...state,
				userData: { ...action.payload.user },
			};

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
				userData: {},
				loggedIn: false,
			};

		default:
			throw new Error("No method matched the dispatch");
	}
};

export default UserReducer;
