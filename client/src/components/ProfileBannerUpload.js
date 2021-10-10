import React, { useContext } from "react";
import defaultBanner from "../assets/default-banner.png";
import { UserContext } from "../context/UserContext";

const ProfileBannerUpload = ({ username, banner, handleFileChange }) => {
	const { user } = useContext(UserContext);

	return (
		<div className="user-info-banner-wrap">
			<img
				src={banner || defaultBanner}
				alt="Sample Banner"
				className={`user-info-banner ${
					!banner && "user-info-banner-border"
				}`}
			/>
			{user && user.username === username && (
				<div className="user-info-banner-submit-wrap">
					<label
						htmlFor="user-info-banner-upload"
						className="user-info-banner-upload-label"
					>
						<i className="fas fa-pencil-alt"></i>
					</label>
					<input
						type="file"
						id="user-info-banner-upload"
						className="user-info-banner-upload-input"
						onChange={(e) => handleFileChange(e, "banner")}
					/>
				</div>
			)}
		</div>
	);
};

export default ProfileBannerUpload;
