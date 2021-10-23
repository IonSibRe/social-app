import React, { useContext, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link as RouterLink } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { GET_USERS_POSTS, GET_USER_INFO_BY_USERNAME } from "../utils/graphql";
import {
	Box,
	Avatar,
	Button,
	CircularProgress,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";

const PostForm = () => {
	const { user } = useContext(UserContext);

	const [postBody, setPostBody] = useState("");
	const [profileImg, setProfileImg] = useState("");
	const [error, setError] = useState(false);

	const [submitPost, { loading }] = useMutation(CREATE_POST, {
		onError: () => setError(true),
		update(cache, { data }) {
			const posts = cache.readQuery({ query: GET_USERS_POSTS });
			cache.writeQuery({
				query: GET_USERS_POSTS,
				data: {
					getUsersPosts: [...posts.getUsersPosts, data.createPost],
				},
			});
		},

		variables: {
			body: postBody,
		},
	});

	const { loading: userInfoLoading } = useQuery(GET_USER_INFO_BY_USERNAME, {
		onCompleted: (data) => {
			if (data.getUserInfoByUsername.profileImg)
				setProfileImg(data.getUserInfoByUsername.profileImg);
		},
		variables: { username: user.username },
	});

	const submitHandler = (e) => {
		e.preventDefault();
		submitPost();
		setPostBody("");
	};

	useEffect(() => {
		const errorTimeout = setTimeout(() => setError(false), 1000);
		return () => clearTimeout(errorTimeout);
	}, [error]);

	return (
		<form onSubmit={submitHandler} style={{ marginBottom: "1rem" }}>
			<Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
				<Typography variant="h4" component="h3">
					Create a Post
				</Typography>
				<RouterLink to={`/users/${user.username}`}>
					<Avatar
						src={profileImg}
						sx={{
							height: 45,
							width: 45,
						}}
					/>
				</RouterLink>
			</Toolbar>
			<TextField
				sx={{ margin: "0.5rem 0 1rem 0" }}
				type="text"
				label="Add Post"
				size="small"
				fullWidth
				value={postBody}
				onChange={(e) => setPostBody(e.target.value)}
			/>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Button
					sx={{ display: "block" }}
					disabled={postBody.length === 0}
					variant="outlined"
					type="submit"
				>
					Submit
				</Button>
				{(loading || userInfoLoading) && <CircularProgress size={30} />}
			</Box>
		</form>
	);
};

const CREATE_POST = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			username
			body
			commentCount
			likeCount
			comments {
				id
				body
				createdAt
			}
			likes {
				id
				username
				createdAt
			}
			createdAt
		}
	}
`;

export default PostForm;
