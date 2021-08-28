const jwt = require("jsonwebtoken");
const { AuthenticationError, ForbiddenError } = require("apollo-server");

module.exports = (context) => {
	const authHeader = context.req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split("Bearer ")[1];

		if (token) {
			try {
				const user = jwt.verify(token, process.env.JWT_KEY);
				return user;
			} catch (err) {
				throw new AuthenticationError("Invalid/Expired token");
			}
		}
		throw new Error(
			"Authentication token must be in a format of 'Bearer [token]"
		);
	}
	throw new ForbiddenError("AuthorizationError", {
		errMsg: "Authorization header must be provided",
	});
};
