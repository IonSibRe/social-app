import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "../context/UserContext";
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Link,
	TextField,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTheme } from "@emotion/react";

const Login = () => {
	const { login, loggedIn } = useContext(UserContext);
	const [error, setError] = useState("");
	const [userCredentials, setUserCredentials] = useState({
		email: "",
		password: "",
	});

	const theme = useTheme();
	const mediaQuerySmMatch = useMediaQuery("(max-width: 500px)");

	const inputPartOfClassName =
		theme.palette.mode === "dark" ? "myb2s4" : "1n4twyu";
	const inputClassName = `.css-${inputPartOfClassName}-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill`;
	const inputBoxShadow =
		theme.palette.mode === "dark"
			? `0 0 0 100px ${grey[900]} inset !important`
			: "0 0 0 100px white inset !important";

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: user } }) {
			login(user);
		},
		onError(err) {
			setError(err.graphQLErrors[0].extensions.errMsg);
		},

		variables: { loginInput: userCredentials },
	});

	const submitHandler = (e) => {
		e.preventDefault();
		loginUser();
	};

	useEffect(() => {
		let timeout = setTimeout(() => {
			setError("");
		}, 3000);
		return () => clearTimeout(timeout);
	}, [error]);

	if (loggedIn) return <Redirect to="/" />;

	return (
		<Container sx={{ display: "flex", justifyContent: "center" }}>
			<Box
				sx={{
					width: mediaQuerySmMatch ? "100%" : "500px",
					marginTop: "3rem",
				}}
			>
				<Box sx={{ padding: "1rem", border: "1px solid #767676" }}>
					<Typography
						sx={{ marginBottom: "1rem" }}
						component="h3"
						variant="h4"
						textAlign="center"
					>
						Login
					</Typography>
					<form onSubmit={submitHandler} autoComplete="off">
						<TextField
							sx={{
								marginBottom: "1rem",
								[inputClassName]: {
									WebkitBoxShadow: inputBoxShadow,
								},
							}}
							fullWidth
							variant="outlined"
							type="email"
							label="Email"
							size="small"
							error={error !== ""}
							onChange={(e) =>
								setUserCredentials({
									...userCredentials,
									email: e.target.value,
								})
							}
						/>
						<TextField
							sx={{
								[inputClassName]: {
									WebkitBoxShadow: inputBoxShadow,
								},
							}}
							fullWidth
							type="password"
							label="Password"
							size="small"
							error={error !== ""}
							onChange={(e) =>
								setUserCredentials({
									...userCredentials,
									password: e.target.value,
								})
							}
						/>
						<Typography variant="body1" my="1rem">
							Don't have an account?{" "}
							<Link
								component={RouterLink}
								to="/register"
								underline="none"
							>
								register here.
							</Link>
						</Typography>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Button type="submit" variant="outlined">
								Login
							</Button>
							{loading && <CircularProgress size={30} />}
						</Box>
					</form>
				</Box>
			</Box>
		</Container>
	);
};

const LOGIN_USER = gql`
	mutation loginUser($loginInput: LoginInput!) {
		login(loginInput: $loginInput) {
			id
			username
			email
			token
		}
	}
`;

export default Login;
