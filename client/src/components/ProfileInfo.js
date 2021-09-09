import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, useContext } from "react";

import { UserContext } from "../context/UserContext";
import ProfileImageUpload from "./ProfileImageUpload";

const ProfileInfo = () => {
	const { user, setUserData } = useContext(UserContext);
	const [userLocalInfo, setUserLocalInfo] = useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		country: "",
		birthDate: "",
		profession: "",
		company: "",
	});

	// Get User Info on Component Load
	const { loading, error } = useQuery(GET_USER_INFO, {
		onCompleted: (data) => updateState(data),
		variables: {
			userId: user.id,
		},
	});

	const [updateUserInfo] = useMutation(UPDATE_USER_INFO, {
		onCompleted: (data) => updateState(data),
		variables: {
			userId: user.id,
			body: userLocalInfo,
		},
	});

	function handleSubmit(e) {
		e.preventDefault();
		updateUserInfo();
	}

	function updateState(data) {
		let userDataResponse = data.updateUserInfo
			? data.updateUserInfo
			: data.getUserInfo;

		let userDataInfo = userDataResponse.userInfo;
		userDataInfo = Object.fromEntries(
			Object.entries(userDataInfo).filter(([key]) => key !== "__typename")
		);

		setUserData(userDataResponse);
		setUserLocalInfo(userDataInfo);
	}

	if (loading) return <h1>Loading</h1>;
	if (error) console.log(error);

	return (
		<div className="profile-info">
			<div className="profile-info-header">
				<h2 className="profile-info-header-text">
					Account Information
				</h2>
			</div>

			<ProfileImageUpload />

			<div className="profile-info-data-wrap">
				<div className="profile-info-data-header">
					<h4 className="profile-info-data-header-text">User</h4>
				</div>
				<form className="profile-info-data-form">
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
						/>
					</div>
					<div className="profile-info-data-item">
						<p className="profile-info-data-item-label">
							Verified?
						</p>
						<p className="profile-info-data-item-verified">Yes</p>
					</div>
					<div className="profile-info-data-item profile-info-data-item-submit-btn-wrap">
						<button className="profile-info-data-item-submit-btn">
							Submit
						</button>
					</div>
				</form>
			</div>
			<div className="profile-info-data-wrap">
				<div className="profile-info-data-header">
					<h4 className="profile-info-data-header-text">
						Additional
					</h4>
				</div>
				<form
					className="profile-info-data-form"
					onSubmit={handleSubmit}
				>
					<div className="profile-info-data-item">
						<label
							htmlFor="first-name"
							className="profile-info-data-item-label"
						>
							First Name:
						</label>
						<input
							type="text"
							className="profile-info-data-item-input"
							value={userLocalInfo.firstName}
							onChange={(e) => {
								setUserLocalInfo({
									...userLocalInfo,
									firstName: e.target.value,
								});
							}}
						/>
					</div>
					<div className="profile-info-data-item">
						<label
							htmlFor="last-name"
							className="profile-info-data-item-label"
						>
							Last Name:
						</label>
						<input
							type="text"
							className="profile-info-data-item-input"
							value={userLocalInfo.lastName}
							onChange={(e) => {
								setUserLocalInfo({
									...userLocalInfo,
									lastName: e.target.value,
								});
							}}
						/>
					</div>
					<div className="profile-info-data-item">
						<label
							htmlFor="phone"
							className="profile-info-data-item-label"
						>
							Phone:
						</label>
						<input
							type="text"
							className="profile-info-data-item-input"
							value={userLocalInfo.phoneNumber}
							onChange={(e) => {
								setUserLocalInfo({
									...userLocalInfo,
									phoneNumber: e.target.value,
								});
							}}
						/>
					</div>
					<div className="profile-info-data-item">
						<label
							htmlFor="country"
							className="profile-info-data-item-label"
						>
							Country:
						</label>
						<input
							type="text"
							className="profile-info-data-item-input"
							value={userLocalInfo.country}
							onChange={(e) => {
								setUserLocalInfo({
									...userLocalInfo,
									country: e.target.value,
								});
							}}
						/>
					</div>
					<div className="profile-info-data-item">
						<label
							htmlFor="birth-date"
							className="profile-info-data-item-label"
						>
							Birth Date:
						</label>
						<input
							type="text"
							className="profile-info-data-item-input"
							value={userLocalInfo.birthDate}
							onChange={(e) => {
								setUserLocalInfo({
									...userLocalInfo,
									birthDate: e.target.value,
								});
							}}
						/>
					</div>
					<div className="profile-info-data-item">
						<label
							htmlFor="profession"
							className="profile-info-data-item-label"
						>
							Profession:
						</label>
						<input
							type="text"
							className="profile-info-data-item-input"
							value={userLocalInfo.profession}
							onChange={(e) => {
								setUserLocalInfo({
									...userLocalInfo,
									profession: e.target.value,
								});
							}}
						/>
					</div>
					<div className="profile-info-data-item">
						<label
							htmlFor="Company"
							className="profile-info-data-item-label"
						>
							Company:
						</label>
						<input
							type="text"
							className="profile-info-data-item-input"
							value={userLocalInfo.company}
							onChange={(e) => {
								setUserLocalInfo({
									...userLocalInfo,
									company: e.target.value,
								});
							}}
						/>
					</div>
					<div className="profile-info-data-item profile-info-data-item-submit-btn-wrap">
						<button className="profile-info-data-item-submit-btn">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

const GET_USER_INFO = gql`
	query getUserInfo($userId: ID!) {
		getUserInfo(userId: $userId) {
			id
			username
			email
			token
			profileImg
			userInfo {
				firstName
				lastName
				phoneNumber
				country
				birthDate
				profession
				company
			}
			createdAt
		}
	}
`;

const UPDATE_USER_INFO = gql`
	mutation updateUserInfo($userId: ID!, $body: UserInfoInput!) {
		updateUserInfo(userId: $userId, body: $body) {
			id
			username
			email
			token
			profileImg
			userInfo {
				firstName
				lastName
				phoneNumber
				country
				birthDate
				profession
				company
			}
			createdAt
		}
	}
`;

export default ProfileInfo;
