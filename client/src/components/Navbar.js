import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { UserContext } from "../context/UserContext";
import ProfileImage from "../components/utils/ProfileImage";
import { GET_USER_INFO_BY_USERNAME } from "../utils/graphql";
import LoaderSpinner from "./utils/LoaderSpinner";

const Navbar = () => {
	const { user, loggedIn, logout } = useContext(UserContext);
	const [profileImg, setProfileImg] = useState("");

	const { loading } = useQuery(GET_USER_INFO_BY_USERNAME, {
		onCompleted: (data) => {
			if (data.getUserInfoByUsername.profileImg)
				setProfileImg(data.getUserInfoByUsername.profileImg);
		},
		variables: { username: user.username },
	});

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
							<input type="text" className="nav-search-bar" />
							{loading ? (
								<LoaderSpinner />
							) : (
								<Link to="/profile/info">
									<ProfileImage profileImg={profileImg} />
								</Link>
							)}
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
