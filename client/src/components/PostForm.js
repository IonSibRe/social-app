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
	IconButton,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { UploadFile, Close } from "@mui/icons-material";

const PostForm = () => {
	const { user } = useContext(UserContext);

	const [postBody, setPostBody] = useState("");
	const [profileImg, setProfileImg] = useState("");
	const [postImg, setPostImg] = useState("");
	const [error, setError] = useState(false);

	const [submitPost, { loading }] = useMutation(CREATE_POST, {
		onError: () => setError(true),
		update(cache, { data }) {
			setPostImg("");
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
			base64File: postImg,
		},
	});

	const { loading: userInfoLoading } = useQuery(GET_USER_INFO_BY_USERNAME, {
		onCompleted: (data) => {
			if (data.getUserInfoByUsername.profileImg)
				setProfileImg(data.getUserInfoByUsername.profileImg);
		},
		variables: { username: user.username },
	});

	const uploadPostImage = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPostImg(reader.result);
		};
	};

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
			<Box
				sx={{
					border: "1px solid #767676",
					margin: "0.5rem 0 1rem 0",
				}}
			>
				<TextField
					sx={{ padding: "1rem 0.5rem" }}
					type="text"
					multiline
					maxRows={4}
					size="small"
					variant="standard"
					placeholder="Add Post"
					fullWidth
					value={postBody}
					onChange={(e) => setPostBody(e.target.value)}
					InputProps={{
						disableUnderline: true,
					}}
				/>

				{postImg && (
					<Box sx={{ position: "relative", padding: "0 0.5rem" }}>
						<IconButton
							sx={{ position: "absolute" }}
							color="danger"
							onClick={() => setPostImg("")}
						>
							<Close />
						</IconButton>
						<img
							src={postImg}
							alt="Post Img"
							style={{
								width: "100%",
								maxHeight: "300px",
								borderRadius: "20px",
							}}
						/>
					</Box>
				)}

				<Box
					sx={{
						height: "1px",
						width: "calc(100% - 1rem)",
						margin: "1rem auto 0 auto",
						backgroundColor: "#767676",
					}}
				/>

				<Box sx={{ padding: "0 0.25rem" }}>
					<label
						htmlFor="user-info-banner-upload"
						style={{
							display: "flex",
							width: "fit-content",
							margin: "1rem 0",
							color: blue[600],
							cursor: "pointer",
						}}
					>
						<UploadFile />
					</label>
					<input
						type="file"
						id="user-info-banner-upload"
						style={{ display: "none" }}
						onChange={(e) => uploadPostImage(e)}
					/>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Button
					sx={{ display: "block" }}
					disabled={postBody.length === 0 && !postImg}
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
	mutation createPost($body: String!, $base64File: String) {
		createPost(body: $body, base64File: $base64File) {
			id
			username
			body
			img
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
