import React, { useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "../context/UserContext";
import personImg from "../assets/person-img.jpg";

const ProfileImageUpload = () => {
	const { userData, setUserData } = useContext(UserContext);

	const [uploadProfileImage] = useMutation(UPLOAD_PROFILE_IMAGE, {
		onCompleted: (data) => setUserData(data.uploadProfileImage),
	});

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) uploadProfileImage({ variables: { file } });
	};

	return (
		<div className="profile-info-img-input-wrap">
			<div className="profile-info-img-wrap">
				<img
					src={`${
						userData && userData.profileImg
							? "data:image/png;base64, " + userData.profileImg
							: personImg
					}`}
					alt="Profile Img"
					className="profile-info-img"
				/>
			</div>
			<label
				htmlFor="profile-file-upload"
				className="profile-file-upload-label"
			>
				<i className="fas fa-pencil-alt"></i>
			</label>
			<input
				type="file"
				id="profile-file-upload"
				className="profile-file-upload-input"
				onChange={handleFileChange}
			/>
		</div>
	);
};

const UPLOAD_PROFILE_IMAGE = gql`
	mutation uploadProfileImage($file: Upload!) {
		uploadProfileImage(file: $file) {
			id
			username
			email
			token
			profileImg
			userInfo {
				firstName
				lastName
				phoneNumber
				country
				birthDate
				profession
				company
			}
			createdAt
		}
	}
`;

export default ProfileImageUpload;
