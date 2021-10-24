import { gql, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { removeTypename } from "../utils/utilities";
import { Box, Button, TextField, Typography } from "@mui/material";
import { green, pink } from "@mui/material/colors";

const ProfileUserInfo = () => {
	const { user, setUser } = useContext(UserContext);
	const [userAuthLocalData, setUserAuthLocalData] = useState({
		username: "",
		email: "",
	});
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");

	const [updateUserAuthData] = useMutation(UPDATE_USER_AUTH_DATA, {
		onCompleted: (data) => {
			if (Object.keys(data.updateUserAuthData).length !== 0)
				setSuccess("Updated Successfully");

			setUserAuthLocalData({ username: "", email: "" });
			const updatedUser = removeTypename(data.updateUserAuthData);
			setUser(updatedUser);
		},
		onError: (err) => {
			setError(err.graphQLErrors[0].message);
		},
		variables: {
			userId: user.id,
			body: userAuthLocalData,
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		updateUserAuthData();
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setError("");
		}, 3000);
		return () => clearTimeout(timeout);
	}, [error]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSuccess("");
		}, 3000);
		return () => clearTimeout(timeout);
	}, [success]);

	const styles = {
		errorOrSuccessBox: {
			marginBottom: "1rem",
			padding: "1rem",
		},
	};

	return (
		<Box>
			<Typography variant="h5" component="h4" my="1rem">
				User
			</Typography>
			{error && (
				<Box
					sx={{
						...styles.errorOrSuccessBox,
						border: `1px solid ${pink["A400"]}`,
					}}
				>
					<Typography variant="body1" color="secondary">
						{error}
					</Typography>
				</Box>
			)}
			{success && (
				<Box
					sx={{
						...styles.errorOrSuccessBox,
						border: `1px solid ${green["A400"]}`,
					}}
				>
					<Typography variant="body1" color={green["A400"]}>
						{success}
					</Typography>
				</Box>
			)}
			<form onSubmit={handleSubmit}>
				<TextField
					sx={{ marginBottom: "0.5rem" }}
					label="Username"
					type="text"
					size="small"
					fullWidth
					value={userAuthLocalData.username}
					onChange={(e) => {
						setUserAuthLocalData({
							...userAuthLocalData,
							username: e.target.value,
						});
					}}
				/>
				<TextField
					label="Email"
					type="text"
					size="small"
					fullWidth
					value={userAuthLocalData.email}
					onChange={(e) => {
						setUserAuthLocalData({
							...userAuthLocalData,
							email: e.target.value,
						});
					}}
				/>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						margin: "1rem 0",
					}}
				>
					<Typography variant="body1">Verified?</Typography>
					<Typography variant="body1">No</Typography>
				</Box>
				<Button variant="outlined" type="submit">
					Submit
				</Button>
			</form>
		</Box>
	);
};

const UPDATE_USER_AUTH_DATA = gql`
	mutation updateUserAuthData($userId: ID!, $body: UserAuthDataInput!) {
		updateUserAuthData(userId: $userId, body: $body) {
			id
			username
			email
			token
		}
	}
`;

export default ProfileUserInfo;
