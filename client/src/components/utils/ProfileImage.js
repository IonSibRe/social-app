import React from "react";

import personImg from "../../assets/person-img.jpg";

const ProfileImage = ({ profileImg, profileImgLg = false }) => {
	return (
		<div
			className={`${
				profileImgLg ? "profile-img-wrap-lg" : "profile-img-wrap"
			}`}
		>
			<img
				src={`${profileImg ? profileImg : personImg}`}
				alt="Profile Img"
				className="profile-img"
			/>
		</div>
	);
};

export default ProfileImage;
