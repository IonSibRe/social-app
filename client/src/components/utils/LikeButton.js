import { gql, useMutation } from "@apollo/client";
import { Box, IconButton, Link, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoginIcon from "@mui/icons-material/Login";
import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const LikeButton = ({ id, likes, likeCount }) => {
	const { user } = useContext(UserContext);
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		if (user && user.username) {
			setLiked(
				likes.find((like) => like.username === user.username)
					? true
					: false
			);
		}
	}, [likes, user]);

	const [likePost] = useMutation(LIKE_POST, {
		variables: {
			postId: id,
		},
	});

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				marginRight: "1rem",
			}}
		>
			{user && user.username ? (
				<IconButton
					color="primary"
					size="medium"
					onClick={() => likePost()}
				>
					{liked ? (
						<FavoriteIcon fontSize="inherit" />
					) : (
						<FavoriteBorderIcon fontSize="inherit" />
					)}
				</IconButton>
			) : (
				<IconButton>
					<Link component={RouterLink} to="/login" underline="none">
						<LoginIcon />
					</Link>
				</IconButton>
			)}
			<Typography variant="body1">{likeCount}</Typography>
		</Box>
	);
};

const LIKE_POST = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			username
			likeCount
			likes {
				id
				username
				createdAt
			}
		}
	}
`;

export default LikeButton;
