import { Box, IconButton, Link, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import AddCommentIcon from "@mui/icons-material/AddComment";
import LoginIcon from "@mui/icons-material/Login";

const CommentButton = ({ id, commentCount }) => {
	const { user } = useContext(UserContext);

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{user && user.username ? (
				<IconButton>
					<Link
						sx={{
							display: "flex",
							alignItems: "flex-end",
						}}
						component={RouterLink}
						to={`/posts/${id}`}
						underline="none"
					>
						<AddCommentIcon />
					</Link>
				</IconButton>
			) : (
				<IconButton>
					<Link component={RouterLink} to={`/login`} underline="none">
						<LoginIcon />
					</Link>
				</IconButton>
			)}
			<Typography variant="body1">{commentCount}</Typography>
		</Box>
	);
};

export default CommentButton;
