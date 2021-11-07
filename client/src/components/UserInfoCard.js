import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import moment from "moment";

import { UserContext } from "../context/UserContext";
import ProfileImageUpload from "./ProfileImageUpload";
import ProfileBannerUpload from "./ProfileBannerUpload";
import { UPLOAD_IMAGE } from "../utils/graphql";
import { getPublicId } from "../utils/utilities";
import FollowButton from "./utils/FollowButton";
import { Box, Typography } from "@mui/material";

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

		if (!file) return;

		const imgExt = `.${
			file.name.split(".")[file.name.split(".").length - 1]
		}`;
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
					imgExt,
					deletePublicId: publicId,
				},
			});
		};
	};

	const styles = {
		followCount: {
			marginRight: "0.25rem",
		},
	};

	return (
		<Box
			sx={{
				position: "relative",
				marginBottom: "2rem",
				border: "1px solid #767676",
			}}
		>
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
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
					marginTop: "5rem",
					padding: "0 10px 10px 10px",
				}}
			>
				<Box>
					<Typography variant="h4" component="h2" color="primary">
						{username}
					</Typography>
					<Typography variant="h5" component="h3" color="secondary">
						{`Joined ${moment(new Date(parseInt(createdAt))).format(
							"MMMM Do, YYYY"
						)}`}
					</Typography>
					<Box sx={{ display: "flex" }}>
						<Typography
							variant="h6"
							component="h3"
							sx={{ marginRight: "0.5rem" }}
						>
							<strong style={styles.followCount}>
								{followingCount}
							</strong>
							Following
						</Typography>
						<Typography variant="h6" component="h3">
							<strong style={styles.followCount}>
								{followersCount}
							</strong>
							Followers
						</Typography>
					</Box>
				</Box>
				{user && username !== user.username && (
					<FollowButton
						userToFollow={username}
						followingArray={following}
					/>
				)}
			</Box>
		</Box>
	);
};

export default UserInfoCard;
