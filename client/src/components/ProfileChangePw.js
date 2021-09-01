import React from "react";

const ProfileChangePw = () => {
	return (
		<div className="profile-info">
			<div className="profile-info-header">
				<h2 className="profile-info-header-text">Change Password</h2>
			</div>
			<div className="profile-info-data-wrap">
				<form className="profile-info-data-form">
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

export default ProfileChangePw;
