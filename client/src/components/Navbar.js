import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

import { UserContext } from "../context/UserContext";
import ProfileImage from "../components/utils/ProfileImage";
import { GET_USER_INFO_BY_USERNAME } from "../utils/graphql";
import LoaderSpinner from "./utils/LoaderSpinner";

const Navbar = () => {
	const { user, loggedIn, logout } = useContext(UserContext);
	const [searchedUsers, setSearchedUsers] = useState([]);
	const [userSearchText, setUserSearchText] = useState("");
	const [searchBoxOpen, setSearchBoxOpen] = useState(false);
	const [profileImg, setProfileImg] = useState("");

	const { loading } = useQuery(GET_USER_INFO_BY_USERNAME, {
		onCompleted: (data) => {
			if (data.getUserInfoByUsername.profileImg)
				setProfileImg(data.getUserInfoByUsername.profileImg);
		},
		skip: !user || Object.keys(user).length === 0,
		variables: { username: user?.username },
	});

	const [getUsersByUsername] = useLazyQuery(GET_USERS_BY_USERNAME, {
		onCompleted: (data) => setSearchedUsers(data.getUsersByUsername),
		onError: (err) => console.log(err),
		fetchPolicy: "cache-and-network",
	});

	const searchForUsers = (e) => {
		const searchText = e.target.value;
		setUserSearchText(searchText);

		if (searchText !== "")
			getUsersByUsername({
				variables: {
					username: searchText,
				},
			});
	};

	useEffect(() => {
		if (userSearchText === "") setSearchedUsers([]);
	}, [userSearchText]);

	useEffect(() => {
		const manageSearchBox = (e) => {
			if (!e.target.classList.contains("nav-search-bar") && searchBoxOpen)
				setSearchBoxOpen(false);

			if (
				e.target.classList.contains("nav-search-bar") &&
				!searchBoxOpen &&
				searchedUsers.length !== 0
			)
				setSearchBoxOpen(true);

			window.removeEventListener("click", manageSearchBox);
		};

		window.addEventListener("click", manageSearchBox);
	}, [searchBoxOpen, searchedUsers]);

	useEffect(() => {
		searchedUsers.length !== 0
			? setSearchBoxOpen(true)
			: setSearchBoxOpen(false);
	}, [searchedUsers]);

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
							<div className="nav-search-bar-wrap">
								<input
									type="text"
									className="nav-search-bar"
									value={userSearchText || ""}
									onChange={(e) => searchForUsers(e)}
								/>
								{searchBoxOpen && (
									<div className="searched-users-wrap">
										{searchedUsers.map((item) => (
											<Link
												to={`/users/${item.username}`}
												className="searched-users-item"
												key={item.id}
											>
												<div className="searched-users-item-img-wrap">
													<ProfileImage
														profileImg={
															item.profileImg
														}
													/>
												</div>
												<div className="searched-users-item-data-wrap">
													<h4 className="searched-users-item-data-username">
														{item.username}
													</h4>
												</div>
											</Link>
										))}
									</div>
								)}
							</div>
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

const GET_USERS_BY_USERNAME = gql`
	query getUsersByUsername($username: String!) {
		getUsersByUsername(username: $username) {
			id
			username
			profileImg
		}
	}
`;

export default Navbar;
