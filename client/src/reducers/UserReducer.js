const UserReducer = (state, action) => {
	switch (action.type) {
		case "SET_USER_PUBLIC_DATA":
			return {
				...state,
				userPublicData: action.payload,
			};

		case "SET_USER_PRIVATE_DATA":
			return {
				...state,
				userPrivateData: action.payload,
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
