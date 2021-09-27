import React, { useContext } from "react";
import { gql, useMutation } from "@apollo/client";

import { UserContext } from "../context/UserContext";
import { updateUserDataAfterFetch } from "../utils/utilities";

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
		<div className="profile-info-data-wrap">
			<div className="profile-info-data-header">
				<h4 className="profile-info-data-header-text">Additional</h4>
			</div>
			<form className="profile-info-data-form" onSubmit={handleSubmit}>
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
						value={userLocalAdditionalData.firstName ?? ""}
						onChange={(e) => {
							setUserLocalAdditionalData({
								...userLocalAdditionalData,
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
						value={userLocalAdditionalData.lastName ?? ""}
						onChange={(e) => {
							setUserLocalAdditionalData({
								...userLocalAdditionalData,
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
						value={userLocalAdditionalData.phoneNumber ?? ""}
						onChange={(e) => {
							setUserLocalAdditionalData({
								...userLocalAdditionalData,
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
						value={userLocalAdditionalData.country ?? ""}
						onChange={(e) => {
							setUserLocalAdditionalData({
								...userLocalAdditionalData,
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
						value={userLocalAdditionalData.birthDate ?? ""}
						onChange={(e) => {
							setUserLocalAdditionalData({
								...userLocalAdditionalData,
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
						value={userLocalAdditionalData.profession ?? ""}
						onChange={(e) => {
							setUserLocalAdditionalData({
								...userLocalAdditionalData,
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
						value={userLocalAdditionalData.company ?? ""}
						onChange={(e) => {
							setUserLocalAdditionalData({
								...userLocalAdditionalData,
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
