import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<nav className="nav">
			<div className="nav-inner">
				<div className="nav-logo-wrap">
					<h1 className="nav-logo-title">Social App</h1>
				</div>
				<div className="nav-user-wrap">
					{loggedIn ? (
						<h2 className="nav-user-text">Test 123</h2>
					) : (
						<Link to="/">
							<i class="fas fa-user"></i>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
