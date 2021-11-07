import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";
import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { UploadFile } from "@mui/icons-material";
import { pink } from "@mui/material/colors";

const ProfileImageUpload = ({ username, profileImg, handleFileChange }) => {
	const { user, loggedIn } = useContext(UserContext);

	return (
		<Box
			sx={{
				position: "absolute",
				top: "175px",
				left: "10px",
				display: "flex",
				alignItems: "flex-end",
			}}
		>
			<Avatar
				src={profileImg}
				sx={{ height: 150, width: 150, fontSize: "4rem" }}
				children={loggedIn ? user.username[0].toUpperCase() : null}
			/>
			{user && user.username === username && (
				<Box>
					<label
						htmlFor="user-info-data-file-upload"
						style={{ color: pink["A400"], cursor: "pointer" }}
					>
						<UploadFile />
					</label>
					<input
						type="file"
						id="user-info-data-file-upload"
						style={{ display: "none" }}
						onChange={(e) => handleFileChange(e, "profile-image")}
					/>
				</Box>
			)}
		</Box>
	);
};

export default ProfileImageUpload;
