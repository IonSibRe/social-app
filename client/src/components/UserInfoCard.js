import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";
import sampleBanner from "../assets/sample-banner.jpg";
import personImg from "../assets/person-img.jpg";

const UserInfoCard = () => {
	const { userData } = useContext(UserContext);

	return (
		<div className="user-info-card">
			<div className="user-info-banner-wrap">
				<img
					src={sampleBanner}
					alt="Sample Banner"
					className="user-info-banner"
				/>
			</div>
			<div className="user-info-data-wrap">
				<div className="user-info-data-img-wrap">
					<img
						src={`${
							userData && userData.profileImg
								? "data:image/png;base64, " +
								  userData.profileImg
								: personImg
						}`}
						alt=""
						className="user-info-data-profile-img"
					/>
				</div>
				<div className="user-info-data-text-wrap">
					<h2 className="user-info-data-username">Username</h2>
					<h3 className="user-info-data-joined">
						Joined August 2021
					</h3>
					<div className="user-info-data-follow-wrap">
						<h3 className="user-info-data-follow-text">
							<strong className="user-info-data-follow-count">
								10
							</strong>
							Following
						</h3>
						<h3 className="user-info-data-follow-text">
							<strong className="user-info-data-follow-count">
								15
							</strong>
							Followers
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserInfoCard;
