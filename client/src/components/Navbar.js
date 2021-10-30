import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
	AppBar,
	Toolbar,
	Typography,
	Link,
	Avatar,
	TextField,
	IconButton,
	useMediaQuery,
	useTheme,
	Container,
	Box,
	Skeleton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import { UserContext } from "../context/UserContext";
import { GET_USER_INFO_BY_USERNAME } from "../utils/graphql";

const themeMode = JSON.parse(localStorage.getItem("themeMode"));

const Navbar = () => {
	const { user, loggedIn, logout } = useContext(UserContext);
	const [searchedUsers, setSearchedUsers] = useState([]);
	const [userSearchText, setUserSearchText] = useState("");
	const [searchBoxOpen, setSearchBoxOpen] = useState(false);
	const [profileImg, setProfileImg] = useState("");

	// MUI
	const theme = useTheme();
	const mediaQueryMdMatch = useMediaQuery(theme.breakpoints.down("md"));
	const mediaQuerySmMatch = useMediaQuery(theme.breakpoints.down("sm"));

	// Get user profile img
	const { loading } = useQuery(GET_USER_INFO_BY_USERNAME, {
		onCompleted: (data) => {
			if (data.getUserInfoByUsername.profileImg)
				setProfileImg(data.getUserInfoByUsername.profileImg);
		},
		skip: !user || Object.keys(user).length === 0,
		variables: { username: user?.username },
	});

	// Search for Users
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

	// Manage Search Box
	const manageSearchBox = useCallback(
		(e) => {
			if (e.target.id !== "nav-search-bar" && searchBoxOpen)
				setSearchBoxOpen(false);

			if (
				e.target.id === "nav-search-bar" &&
				!searchBoxOpen &&
				searchedUsers.length !== 0
			)
				setSearchBoxOpen(true);
		},
		[searchBoxOpen, searchedUsers.length]
	);

	// Clear searched users when input is empty
	useEffect(() => {
		if (userSearchText === "") setSearchedUsers([]);
	}, [userSearchText]);

	// Open or Close Search Box on Click
	useEffect(() => {
		window.addEventListener("click", manageSearchBox);

		return () => {
			window.removeEventListener("click", manageSearchBox);
		};
	}, [searchBoxOpen, searchedUsers, manageSearchBox]);

	// Open or Close Search Box according to how many users are searched
	useEffect(() => {
		searchedUsers.length > 0
			? setSearchBoxOpen(true)
			: setSearchBoxOpen(false);
	}, [searchedUsers]);

	// MUI Styles
	const styles = {
		toolbar: {
			justifyContent: "space-between",
		},
		avatar: {
			height: 45,
			width: 45,
			margin: "0 1rem 0 2rem",
		},
		searchBox: {
			position: "absolute",
			width: "100%",
			border: themeMode === "dark" ? "" : "1px solid #767676",
			backgroundColor: `${themeMode === "dark" ? "#192734" : "#fff"}`,
			zIndex: "999",
		},
		searchBoxItem: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			padding: "0.5rem",
			borderBottom: `1px solid ${
				themeMode === "dark" ? "#0A1929" : "#767676"
			}`,
			"&:hover": {
				opacity: "0.9",
			},
			"&:last-child": {
				borderBottom: "0",
			},
		},
	};

	const stylesMd = {
		toolbar: {
			flexDirection: "column",
			justifyItems: "center",
		},
		title: {
			marginTop: "0.5rem",
		},
	};

	const stylesSm = {
		innerToolbar: {
			flexDirection: "column",
		},
		textFieldWrap: {
			order: 2,
			marginBottom: "0.5rem",
		},
		avatarAndLogoutWrap: {
			order: 1,
			margin: "0.5rem 0",
		},
	};

	return (
		<AppBar color="inherit" elevation={2} position="static">
			<Container maxWidth="xl">
				<Toolbar
					sx={
						mediaQueryMdMatch && loggedIn
							? stylesMd.toolbar
							: styles.toolbar
					}
				>
					<Typography
						variant="h4"
						component="h2"
						sx={
							mediaQueryMdMatch && loggedIn
								? stylesMd.title
								: null
						}
					>
						<Link component={RouterLink} to="/" underline="none">
							Social App
						</Link>
					</Typography>
					{loggedIn ? (
						<Toolbar
							sx={
								mediaQuerySmMatch ? stylesSm.innerToolbar : null
							}
						>
							<Box
								sx={{
									position: "relative",
									...(mediaQuerySmMatch
										? stylesSm.textFieldWrap
										: null),
								}}
							>
								<TextField
									id="nav-search-bar"
									type="search"
									value={userSearchText || ""}
									label="Search"
									size="small"
									onChange={(e) => searchForUsers(e)}
								/>
								{searchBoxOpen && (
									<Box sx={styles.searchBox}>
										{searchedUsers.map((item) => (
											<Link
												sx={styles.searchBoxItem}
												component={RouterLink}
												to={`/users/${item.username}`}
												underline="none"
												key={item.id}
											>
												<Avatar
													src={item.profileImg}
													sx={{
														height: 45,
														width: 45,
													}}
												/>
												<Typography
													variant="h5"
													component="h4"
												>
													{item.username}
												</Typography>
											</Link>
										))}
									</Box>
								)}
							</Box>
							<Box
								sx={{
									display: "flex",
									...(mediaQuerySmMatch
										? stylesSm.avatarAndLogoutWrap
										: null),
								}}
							>
								{loading ? (
									<Skeleton
										variant="circular"
										sx={styles.avatar}
									/>
								) : (
									<RouterLink to="/profile/info">
										<Avatar
											src={profileImg}
											sx={styles.avatar}
										/>
									</RouterLink>
								)}
								<IconButton
									color="primary"
									size="medium"
									onClick={logout}
								>
									<LogoutIcon fontSize="inherit" />
								</IconButton>
							</Box>
						</Toolbar>
					) : (
						<Link
							sx={{ display: "flex", alignItems: "flex-end" }}
							component={RouterLink}
							to="/login"
							underline="none"
						>
							<LoginIcon />
						</Link>
					)}
				</Toolbar>
			</Container>
		</AppBar>
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
