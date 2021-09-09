import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
	const { user, loggedIn, logout } = useContext(UserContext);

	return (
		<nav className="nav">
			<div className="nav-inner section-center">
				<div className="nav-logo-wrap">
					<Link to="/" className="nav-logo-title">
						Social App
					</Link>
				</div>
				<div className="nav-user-wrap">
					{loggedIn ? (
						<div className="nav-user-logged-wrap">
							<Link to="/profile/info" className="nav-user-text">
								{user.username}
							</Link>
							<div className="nav-user-separation-line"></div>
							<button
								className="nav-user-logout-btn"
								onClick={logout}
							>
								<i className="fas fa-sign-out-alt nav-user-logout-icon"></i>
							</button>
						</div>
					) : (
						<Link to="/login" className="nav-user-login-link">
							<i className="fas fa-user nav-user-login-icon"></i>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
