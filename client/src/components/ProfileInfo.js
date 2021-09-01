import React from "react";

const ProfileInfo = () => {
	return (
		<div className="profile-info">
			<div className="profile-info-header">
				<h2 className="profile-info-header-text">
					Account Information
				</h2>
			</div>
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
				<form className="profile-info-data-form">
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

export default ProfileInfo;
