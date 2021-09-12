import React, { useContext } from "react";

import { UserContext } from "../../context/UserContext";
import personImg from "../../assets/person-img.jpg";

const ProfileImage = () => {
	const { userData } = useContext(UserContext);

	return (
		<div className="profile-img-wrap">
			<img
				src={`${
					userData && userData.profileImg
						? "data:image/png;base64, " + userData.profileImg
						: personImg
				}`}
				alt="Profile Img"
				className="profile-img"
			/>
		</div>
	);
};

export default ProfileImage;
