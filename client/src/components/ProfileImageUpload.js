import React, { useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "../context/UserContext";
import personImg from "../assets/person-img.jpg";

const ProfileImageUpload = ({ profileImg }) => {
	const { user, setUserPublicData } = useContext(UserContext);

	const [uploadProfileImage] = useMutation(UPLOAD_PROFILE_IMAGE, {
		onCompleted: (data) => {
			setUserPublicData(data.uploadProfileImage);
			window.location.reload();
		},
	});

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		let publicId;
		if (profileImg) {
			publicId = profileImg
				.split("/")
				[profileImg.split("/").length - 1].split(".")[0];
		}

		reader.readAsDataURL(file);
		reader.onloadend = () => {
			uploadProfileImage({
				variables: {
					base64File: reader.result,
					deletePublicId: publicId,
				},
			});
		};
	};

	return (
		<div className="user-info-data-img-wrap">
			<div className="user-info-data-img-inner-wrap">
				<img
					src={profileImg ? profileImg : personImg}
					alt="Profile Img"
					className="user-info-data-img"
				/>
			</div>
			{user && user.username && (
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
						onChange={handleFileChange}
					/>
				</div>
			)}
		</div>
	);
};

const UPLOAD_PROFILE_IMAGE = gql`
	mutation uploadProfileImage($base64File: String!, $deletePublicId: ID) {
		uploadProfileImage(
			base64File: $base64File
			deletePublicId: $deletePublicId
		) {
			id
			username
			description
			profileImg
			followers
			following
			createdAt
			userAdditionalInfo {
				firstName
				lastName
				phoneNumber
				country
				birthDate
				profession
				company
			}
		}
	}
`;

export default ProfileImageUpload;
