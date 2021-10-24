import React, { useContext } from "react";
import { gql, useMutation } from "@apollo/client";

import { UserContext } from "../context/UserContext";
import { updateUserDataAfterFetch } from "../utils/utilities";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";

const ProfileAdditionalInfo = ({
	userLocalAdditionalData,
	setUserLocalAdditionalData,
}) => {
	const { user, setUserPublicData } = useContext(UserContext);

	const [updateUserAdditionalInfo] = useMutation(
		UPDATE_USER_ADDITIONAL_INFO,
		{
			onCompleted: (data) => {
				updateUserDataAfterFetch(
					data,
					setUserPublicData,
					setUserLocalAdditionalData
				);
			},
			variables: {
				userId: user.id,
				body: userLocalAdditionalData,
			},
		}
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		updateUserAdditionalInfo();
	};

	return (
		<Box>
			<Typography variant="h5" component="h4" my="1rem">
				Additional
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					sx={{ marginBottom: "0.5rem" }}
					label="First Name"
					type="text"
					size="small"
					fullWidth
					value={userLocalAdditionalData.firstName ?? ""}
					onChange={(e) => {
						setUserLocalAdditionalData({
							...userLocalAdditionalData,
							firstName: e.target.value,
						});
					}}
				/>
				<TextField
					sx={{ marginBottom: "0.5rem" }}
					label="Last Name"
					type="text"
					size="small"
					fullWidth
					value={userLocalAdditionalData.lastName ?? ""}
					onChange={(e) => {
						setUserLocalAdditionalData({
							...userLocalAdditionalData,
							lastName: e.target.value,
						});
					}}
				/>
				<TextField
					sx={{ marginBottom: "0.5rem" }}
					label="Phone"
					type="text"
					size="small"
					fullWidth
					value={userLocalAdditionalData.phoneNumber ?? ""}
					onChange={(e) => {
						setUserLocalAdditionalData({
							...userLocalAdditionalData,
							phoneNumber: e.target.value,
						});
					}}
				/>
				<TextField
					sx={{ marginBottom: "0.5rem" }}
					label="Country"
					type="text"
					size="small"
					fullWidth
					value={userLocalAdditionalData.country ?? ""}
					onChange={(e) => {
						setUserLocalAdditionalData({
							...userLocalAdditionalData,
							country: e.target.value,
						});
					}}
				/>
				<TextField
					sx={{ marginBottom: "0.5rem" }}
					label="Birth Date"
					type="text"
					size="small"
					fullWidth
					value={userLocalAdditionalData.birthDate ?? ""}
					onChange={(e) => {
						setUserLocalAdditionalData({
							...userLocalAdditionalData,
							birthDate: e.target.value,
						});
					}}
				/>
				<TextField
					sx={{ marginBottom: "0.5rem" }}
					label="Profession"
					type="text"
					size="small"
					fullWidth
					value={userLocalAdditionalData.profession ?? ""}
					onChange={(e) => {
						setUserLocalAdditionalData({
							...userLocalAdditionalData,
							profession: e.target.value,
						});
					}}
				/>
				<TextField
					sx={{ marginBottom: "1rem" }}
					label="Company"
					type="text"
					size="small"
					fullWidth
					value={userLocalAdditionalData.company ?? ""}
					onChange={(e) => {
						setUserLocalAdditionalData({
							...userLocalAdditionalData,
							company: e.target.value,
						});
					}}
				/>
				<Button variant="outlined">Submit</Button>
			</form>
		</Box>
	);
};

const UPDATE_USER_ADDITIONAL_INFO = gql`
	mutation updateUserAdditionalInfo(
		$userId: ID!
		$body: UserAdditionalInfoInput!
	) {
		updateUserAdditionalInfo(userId: $userId, body: $body) {
			id
			username
			email
			description
			profileImg
			followers
			following
			createdAt
			userAdditionalInfo {
				firstName
				lastName
				phoneNumber
				country
				birthDate
				profession
				company
			}
		}
	}
`;

export default ProfileAdditionalInfo;
