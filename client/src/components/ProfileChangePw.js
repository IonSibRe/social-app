import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

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
		<div className="profile-info">
			<div className="profile-info-header">
				<h2 className="profile-info-header-text">Change Password</h2>
			</div>
			<div className="profile-info-data-wrap">
				<form
					className="profile-info-data-form"
					onSubmit={handleSubmit}
				>
					<div className="profile-info-data-item">
						<label
							htmlFor="new-password"
							className="profile-info-data-item-label"
						>
							New Password
						</label>
						<input
							type="password"
							className="profile-info-data-item-input"
							onChange={(e) =>
								setResetPasswordInput({
									...resetPasswordInput,
									password: e.target.value,
								})
							}
						/>
					</div>
					<div className="profile-info-data-item">
						<label
							htmlFor="confirm-password"
							className="profile-info-data-item-label"
						>
							Confirm Password
						</label>
						<input
							type="password"
							className="profile-info-data-item-input"
							onChange={(e) =>
								setResetPasswordInput({
									...resetPasswordInput,
									confirmPassword: e.target.value,
								})
							}
						/>
					</div>
					<div className="profile-info-data-item profile-info-data-item-submit-btn-wrap">
						<button
							type="submit"
							className="profile-info-data-item-submit-btn"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
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
