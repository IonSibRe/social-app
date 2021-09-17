import React, { useContext } from "react";

import { UserContext } from "../../context/UserContext";
import personImg from "../../assets/person-img.jpg";

const ProfileImage = () => {
	const { userData } = useContext(UserContext);

	// "data:image/png;base64, " + userData.profileImg

	return (
		<div className="profile-img-wrap">
			<img
				src={`${
					userData && userData.profileImg ? personImg : personImg
				}`}
				alt="Profile Img"
				className="profile-img"
			/>
		</div>
	);
};

export default ProfileImage;
