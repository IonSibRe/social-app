import React, { useContext } from "react";
import sampleBanner from "../assets/sample-banner.jpg";
import { UserContext } from "../context/UserContext";

const ProfileBannerUpload = ({ banner, handleFileChange }) => {
	const { user } = useContext(UserContext);

	return (
		<div className="user-info-banner-wrap">
			<img
				src={banner || sampleBanner}
				alt="Sample Banner"
				className="user-info-banner"
			/>
			{user && user.username && (
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
