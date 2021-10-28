import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { Link as RouterLink } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { GET_USER_INFO_BY_USERNAME } from "../utils/graphql";
import LikeButton from "./utils/LikeButton";
import CommentButton from "./utils/CommentButton";
import DeleteButton from "./utils/DeleteButton";
import { formatMsFromEpochToFromNow } from "../utils/utilities";
import {
	Box,
	Toolbar,
	Typography,
	Avatar,
	CircularProgress,
	Link,
} from "@mui/material";

const Post = ({
	post: {
		id,
		username,
		body,
		img,
		commentCount,
		likes,
		likeCount,
		createdAt,
	},
}) => {
	const { user } = useContext(UserContext);
	const [profileImg, setProfileImg] = useState("");

	const { loading } = useQuery(GET_USER_INFO_BY_USERNAME, {
		onCompleted: (data) =>
			setProfileImg(data.getUserInfoByUsername.profileImg),
		onError: (err) => console.log(err),
		variables: { username },
	});

	return (
		<Box
			sx={{
				marginBottom: "1rem",
				border: "1px solid #767676",
			}}
		>
			<Toolbar
				disableGutters
				sx={{
					justifyContent: "space-between",
					alignItems: "center",
					padding: "1rem 0.5rem",
					borderBottom: "1px solid #767676",
				}}
			>
				<Box>
					<Typography variant="h5">{username}</Typography>
					<Link
						component={RouterLink}
						to={`/posts/${id}`}
						underline="none"
					>
						{formatMsFromEpochToFromNow(createdAt)}
					</Link>
				</Box>
				<RouterLink to={`/users/${username}`}>
					{loading ? (
						<CircularProgress />
					) : (
						<Avatar
							src={profileImg}
							sx={{
								height: 45,
								width: 45,
							}}
						/>
					)}
				</RouterLink>
			</Toolbar>

			<Box
				sx={{
					padding: "1rem 0.5rem",
					borderBottom: "1px solid #767676",
				}}
			>
				<Typography variant="body1" mb="0.5rem">
					{body}
				</Typography>
				{img && (
					<img
						src={img}
						alt="Post Img"
						style={{
							width: "100%",
							maxHeight: "300px",
							borderRadius: "5px",
						}}
					/>
				)}
			</Box>

			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					padding: "0.25rem 0.5rem",
				}}
			>
				<Box
					sx={{ display: "flex", position: "relative", left: "-8px" }}
				>
					<LikeButton id={id} likes={likes} likeCount={likeCount} />
					<CommentButton id={id} commentCount={commentCount} />
				</Box>
				{user && user.username === username && (
					<Box>
						<DeleteButton postId={id} />
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Post;
