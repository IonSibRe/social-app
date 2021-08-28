import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
	return (
		<div className="error-section">
			<div className="error-section-inner-wrap">
				<h1 className="error-title">404</h1>
				<h2 className="error-subtitle">Page Not Found</h2>
				<p className="error-text">
					The page you are looking for might have been removed, had
					it's name changed or is temporarily unavailable.
				</p>
				<Link className="error-link" to="/">
					Homepage
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
