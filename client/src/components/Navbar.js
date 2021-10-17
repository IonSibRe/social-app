import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
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
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import { UserContext } from "../context/UserContext";
import { GET_USER_INFO_BY_USERNAME } from "../utils/graphql";
import LoaderSpinner from "./utils/LoaderSpinner";

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

	// FIX: Search for Users
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
					sx={mediaQueryMdMatch ? stylesMd.toolbar : styles.toolbar}
				>
					<Typography
						variant="h4"
						component="h2"
						sx={mediaQueryMdMatch ? stylesMd.title : null}
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
								sx={
									mediaQuerySmMatch
										? stylesSm.textFieldWrap
										: null
								}
							>
								<TextField
									type="search"
									value={userSearchText || ""}
									label="Search"
									size="small"
									onChange={(e) => searchForUsers(e)}
								/>
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
									<LoaderSpinner />
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
							component={RouterLink}
							to="/login"
							color="#fff"
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
