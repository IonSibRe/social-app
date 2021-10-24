import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Box, Button, TextField, Typography } from "@mui/material";

const ProfileChangePw = () => {
	const [resetPasswordInput, setResetPasswordInput] = useState({
		password: "",
		confirmPassword: "",
	});

	const [changePassword] = useMutation(CHANGE_PASSWORD, {
		variables: {
			resetPasswordInput,
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		changePassword();
	};

	return (
		<Box sx={{ flex: "3" }}>
			<Typography variant="h4" component="h2" mb="1rem">
				Account Information
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					sx={{ marginBottom: "0.5rem" }}
					label="New Password"
					type="password"
					size="small"
					fullWidth
					value={resetPasswordInput.password}
					onChange={(e) => {
						setResetPasswordInput({
							...resetPasswordInput,
							password: e.target.value,
						});
					}}
				/>
				<TextField
					sx={{ marginBottom: "1rem" }}
					label="Confirm Password"
					type="password"
					size="small"
					fullWidth
					value={resetPasswordInput.confirmPassword}
					onChange={(e) => {
						setResetPasswordInput({
							...resetPasswordInput,
							confirmPassword: e.target.value,
						});
					}}
				/>
				<Button type="submit" variant="outlined">
					Submit
				</Button>
			</form>
		</Box>
	);
};

const CHANGE_PASSWORD = gql`
	mutation changePassword($resetPasswordInput: ResetPasswordInput!) {
		changePassword(resetPasswordInput: $resetPasswordInput) {
			id
		}
	}
`;

export default ProfileChangePw;
