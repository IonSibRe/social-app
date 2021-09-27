import { gql, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { removeTypename } from "../utils/utilities";

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
		onError: (err) => setError(err.graphQLErrors[0].message),
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

	return (
		<div className="profile-info-data-wrap">
			<div className="profile-info-data-header">
				<h4 className="profile-info-data-header-text">User</h4>
			</div>
			{error && (
				<div className="profile-info-error-wrap">
					<p className="profile-info-error-text">{error}</p>
				</div>
			)}
			{success && (
				<div className="profile-info-success-wrap">
					<p className="profile-info-success-text">{success}</p>
				</div>
			)}
			<form className="profile-info-data-form" onSubmit={handleSubmit}>
				<div className="profile-info-data-item">
					<label
						htmlFor="username"
						className="profile-info-data-item-label"
					>
						Username:
					</label>
					<input
						type="text"
						className="profile-info-data-item-input"
						value={userAuthLocalData.username}
						onChange={(e) => {
							setUserAuthLocalData({
								...userAuthLocalData,
								username: e.target.value,
							});
						}}
					/>
				</div>
				<div className="profile-info-data-item">
					<label
						htmlFor="email"
						className="profile-info-data-item-label"
					>
						Email:
					</label>
					<input
						type="email"
						className="profile-info-data-item-input"
						value={userAuthLocalData.email}
						onChange={(e) => {
							setUserAuthLocalData({
								...userAuthLocalData,
								email: e.target.value,
							});
						}}
					/>
				</div>
				<div className="profile-info-data-item">
					<p className="profile-info-data-item-label">Verified?</p>
					<p className="profile-info-data-item-verified">Yes</p>
				</div>
				<div className="profile-info-data-item profile-info-data-item-submit-btn-wrap">
					<button className="profile-info-data-item-submit-btn">
						Submit
					</button>
				</div>
			</form>
		</div>
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
