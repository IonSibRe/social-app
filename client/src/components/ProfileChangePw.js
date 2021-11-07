import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

const ProfileChangePw = () => {
	const [resetPasswordInput, setResetPasswordInput] = useState({
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState("");

	const [changePassword] = useMutation(CHANGE_PASSWORD, {
		onCompleted: () => setSuccess("Updated Successfully"),
		onError: () => setError(true),
		variables: {
			resetPasswordInput,
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		changePassword();
	};

	useEffect(() => {
		let timeout = setTimeout(() => {
			setSuccess("");
		}, 3000);
		return () => clearTimeout(timeout);
	}, [success]);

	useEffect(() => {
		let timeout = setTimeout(() => {
			setError(false);
		}, 3000);
		return () => clearTimeout(timeout);
	}, [error]);

	return (
		<Box sx={{ flex: "3" }}>
			<Typography variant="h4" component="h2" mb="1rem">
				Account Information
			</Typography>
			{success && (
				<Box
					sx={{
						marginBottom: "1rem",
						padding: "1rem",
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
					label="New Password"
					type="password"
					size="small"
					fullWidth
					error={error}
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
					error={error}
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
