const UserReducer = (state, action) => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.payload,
			};

		case "SET_USER_PUBLIC_DATA":
			return {
				...state,
				userPublicData: action.payload,
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
				userPublicData: {},
				loggedIn: false,
			};

		default:
			throw new Error("No method matched the dispatch");
	}
};

export default UserReducer;
