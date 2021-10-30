import { gql, useMutation } from "@apollo/client";
import { Box, IconButton, Link, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const LikeButton = ({ id, likes, likeCount }) => {
	const { user, loggedIn } = useContext(UserContext);
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		if (loggedIn) {
			setLiked(
				likes.find((like) => like.username === user.username)
					? true
					: false
			);
		}
	}, [likes, user, loggedIn]);

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
			{loggedIn ? (
				<IconButton color="primary" onClick={() => likePost()}>
					{liked ? (
						<FavoriteIcon fontSize="inherit" color="secondary" />
					) : (
						<FavoriteBorderIcon
							fontSize="inherit"
							color="secondary"
						/>
					)}
				</IconButton>
			) : (
				<IconButton color="primary" size="medium">
					<Link
						component={RouterLink}
						sx={{
							display: "flex",
							alignItems: "flex-end",
						}}
						to="/login"
						underline="none"
					>
						<FavoriteBorderIcon
							fontSize="inherit"
							color="secondary"
						/>
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
