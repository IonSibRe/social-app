import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import moment from "moment";

import { UserContext } from "../context/UserContext";
import ProfileImageUpload from "./ProfileImageUpload";
import ProfileBannerUpload from "./ProfileBannerUpload";
import { UPLOAD_IMAGE } from "../utils/graphql";
import { getPublicId } from "../utils/utilities";
import FollowButton from "./FollowButton";

const UserInfoCard = ({
	cardData: {
		username,
		profileImg,
		banner,
		following,
		followingCount,
		followersCount,
		createdAt,
	},
}) => {
	const { user, setUserPublicData } = useContext(UserContext);

	const [uploadImage] = useMutation(UPLOAD_IMAGE, {
		onCompleted: (data) => {
			setUserPublicData(data[0]);
			window.location.reload();
		},
		onError: (err) => console.log(err),
	});

	const handleFileChange = (e, imgType) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		let publicId;

		if (imgType === "profile-image") {
			if (profileImg) publicId = getPublicId(profileImg);
		} else {
			if (banner) publicId = getPublicId(banner);
		}

		reader.readAsDataURL(file);
		reader.onloadend = () => {
			uploadImage({
				variables: {
					base64File: reader.result,
					imgType,
					deletePublicId: publicId,
				},
			});
		};
	};

	return (
		<div className="user-info-card">
			<ProfileBannerUpload
				username={username}
				banner={banner}
				handleFileChange={handleFileChange}
			/>
			<ProfileImageUpload
				username={username}
				profileImg={profileImg}
				handleFileChange={handleFileChange}
			/>
			<div className="user-info-data-wrap">
				<div className="user-info-data-text-wrap">
					<div className="user-info-data-inner-text-wrap">
						<h2 className="user-info-data-username">{username}</h2>
						<h3 className="user-info-data-joined">
							{`Joined ${moment(
								new Date(parseInt(createdAt))
							).format("MMMM Do, YYYY")}`}
						</h3>
						<div className="user-info-data-follow-wrap">
							<h3 className="user-info-data-follow-text">
								<strong className="user-info-data-follow-count">
									{followingCount}
								</strong>
								Following
							</h3>
							<h3 className="user-info-data-follow-text">
								<strong className="user-info-data-follow-count">
									{followersCount}
								</strong>
								Followers
							</h3>
						</div>
					</div>
					{user && username !== user.username && (
						<div className="user-info-data-inner-text-wrap user-info-data-follow-btn-wrap">
							<FollowButton
								userToFollow={username}
								followingArray={following}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserInfoCard;
