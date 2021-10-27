import { Box } from "@mui/system";
import React, { useContext } from "react";
import defaultBanner from "../assets/default-banner.png";
import { UserContext } from "../context/UserContext";
import { UploadFile } from "@mui/icons-material";
import { pink } from "@mui/material/colors";

const ProfileBannerUpload = ({ username, banner, handleFileChange }) => {
	const { user } = useContext(UserContext);

	return (
		<Box sx={{ position: "relative" }}>
			<img
				src={banner || defaultBanner}
				alt="User Banner"
				style={{ height: "250px", width: "100%" }}
			/>
			{user && user.username === username && (
				<Box
					sx={{
						position: "absolute",
						top: "95%",
						left: "98.5%",
						transform: "translate(-95%, -98.5%)",
					}}
				>
					<label
						htmlFor="user-info-banner-upload"
						style={{
							color: pink["A400"],
							cursor: "pointer",
						}}
					>
						<UploadFile />
					</label>
					<input
						type="file"
						id="user-info-banner-upload"
						style={{ display: "none" }}
						onChange={(e) => handleFileChange(e, "banner")}
					/>
				</Box>
			)}
		</Box>
	);
};

export default ProfileBannerUpload;
