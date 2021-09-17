import React, { useContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "../context/UserContext";
import personImg from "../assets/person-img.jpg";

const ProfileImageUpload = () => {
	const { userData, setUserData } = useContext(UserContext);
	const [base64File, setBase64File] = useState("");

	const [uploadProfileImage] = useMutation(UPLOAD_PROFILE_IMAGE, {
		onCompleted: (data) => setUserData(data.uploadProfileImage),
	});

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setBase64File(reader.result);
		};
	};

	useEffect(() => {
		if (base64File) uploadProfileImage({ variables: { base64File } });
	}, [base64File]);

	return (
		<div className="user-info-data-img-wrap">
			<div className="user-info-data-img-inner-wrap">
				<img
					src={
						userData && userData.profileImg
							? userData.profileImg
							: personImg
					}
					alt="Profile Img"
					className="user-info-data-img"
				/>
			</div>
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
		</div>
	);
};

const UPLOAD_PROFILE_IMAGE = gql`
	mutation uploadProfileImage($base64File: String!) {
		uploadProfileImage(base64File: $base64File) {
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
