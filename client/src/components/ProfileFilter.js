import React from "react";
import { Box, Link, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const styles = {
	link: {
		padding: "0.5rem 0",
		textAlign: "center",
		borderBottom: "1px solid #767676",
		"&:hover": {
			opacity: "0.9",
		},
	},
};

const ProfileFilter = ({ setModalOpen }) => {
	const theme = useTheme();
	const mediaQueryMdMatch = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Box
			sx={{
				flex: "1.25",
				minHeight: mediaQueryMdMatch ? "100%" : "500px",
				margin: mediaQueryMdMatch ? "0 0 2rem 0" : "0 2rem 0 0",
				border: "1px solid #767676",
			}}
		>
			<Typography
				sx={{ padding: "1rem 0", borderBottom: "1px solid #767676" }}
				component="h3"
				variant="h4"
				textAlign="center"
			>
				Account Management
			</Typography>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Link
					sx={{
						...styles.link,
					}}
					component={RouterLink}
					to="/profile/info"
					underline="none"
				>
					Account Information
				</Link>
				<Link
					sx={{
						...styles.link,
					}}
					component={RouterLink}
					to="/profile/password-change"
					underline="none"
				>
					Change Password
				</Link>
				<Link
					sx={{
						...styles.link,
					}}
					component={RouterLink}
					to="/profile/customize"
					underline="none"
				>
					Customize
				</Link>
				<Link
					sx={{ ...styles.link, cursor: "pointer" }}
					color="secondary"
					underline="none"
					onClick={() => setModalOpen(true)}
				>
					Deactivate Account
				</Link>
			</Box>
		</Box>
	);
};

export default ProfileFilter;
