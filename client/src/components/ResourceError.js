import React from "react";

const ResourceError = () => {
	return (
		<div className="resource-error-wrap">
			<h1 className="resource-error-title">Something went wrong.</h1>
			<p className="resource-error-text">
				The resource you're trying to access cannot be reached
			</p>
		</div>
	);
};

export default ResourceError;
