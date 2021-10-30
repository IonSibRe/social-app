import { Box, IconButton, Link, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import AddCommentIcon from "@mui/icons-material/AddComment";

const CommentButton = ({ id, commentCount }) => {
	const { loggedIn } = useContext(UserContext);

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<IconButton>
				<Link
					sx={{
						display: "flex",
						alignItems: "flex-end",
					}}
					component={RouterLink}
					to={loggedIn ? `/posts/${id}` : "/login"}
					underline="none"
				>
					<AddCommentIcon />
				</Link>
			</IconButton>

			<Typography variant="body1">{commentCount}</Typography>
		</Box>
	);
};

export default CommentButton;
