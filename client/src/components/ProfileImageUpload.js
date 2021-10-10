import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";
import personImg from "../assets/person-img.jpg";

const ProfileImageUpload = ({ username, profileImg, handleFileChange }) => {
	const { user } = useContext(UserContext);

	return (
		<div className="user-info-data-img-wrap">
			<div
				className={`user-info-data-img-inner-wrap ${
					!profileImg && "rm-border"
				}`}
			>
				<img
					src={profileImg ? profileImg : personImg}
					alt="Profile Img"
					className="user-info-data-img"
				/>
			</div>
			{user && user.username === username && (
				<div className="user-info-data-img-submit-wrap">
					<label
						htmlFor="user-info-data-file-upload"
						className="user-info-data-upload-label"
					>
						<i className="fas fa-pencil-alt"></i>
					</label>
					<input
						type="file"
						id="user-info-data-file-upload"
						className="user-info-data-upload-input"
						onChange={(e) => handleFileChange(e, "profile-image")}
					/>
				</div>
			)}
		</div>
	);
};

export default ProfileImageUpload;
