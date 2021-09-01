import React from "react";
import { Link } from "react-router-dom";

const ProfileFilter = ({ setModalOpen }) => {
	return (
		<div className="profile-filter">
			<div className="profile-filter-header">
				<h3 className="profile-filter-header-text">
					Account Management
				</h3>
			</div>
			<div className="profile-filter-list">
				<Link to="/profile/info" className="profile-filter-list-link">
					Account Information
				</Link>
				<Link
					to="/profile/password-change"
					className="profile-filter-list-link"
				>
					Change Password
				</Link>
				<button
					type="button"
					onClick={() => setModalOpen(true)}
					className="profile-filter-list-link profile-deactivate-btn"
				>
					Deactivate Account
				</button>
			</div>
		</div>
	);
};

export default ProfileFilter;
