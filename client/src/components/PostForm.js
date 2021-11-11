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
import { blue, red } from "@mui/material/colors";
import { UploadFile, Close } from "@mui/icons-material";

// JPEG, JPG and PNG file signatures
const supportedSignatures = [
	"89504e470d0a1a0a",
	"ffd8ffdB",
	"ffd8ffe0",
	"ffd8ffee",
	"ffd8ffe1",
];

const PostForm = () => {
	const { user, loggedIn } = useContext(UserContext);

	const [charCounter, setCharCounter] = useState(0);
	const [postBody, setPostBody] = useState("");
	const [profileImg, setProfileImg] = useState("");
	const [postImg, setPostImg] = useState("");
	const [error, setError] = useState("");

	const [submitPost, { loading }] = useMutation(CREATE_POST, {
		onError: (err) => console.log(err),
		update(cache, { data }) {
			setPostImg("");
			setPostBody("");
			const posts = cache.readQuery({ query: GET_USERS_POSTS });
			cache.writeQuery({
				query: GET_USERS_POSTS,
				data: {
					getUsersPosts: [data.createPost, ...posts.getUsersPosts],
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

		if (!file) return;

		// Check File formats
		const checkFileFormats = (base64File) => {
			const fileBuffer = Buffer.from(
				base64File.replace(/^data:image\/\w+;base64,/, ""),
				"base64"
			);

			return supportedSignatures.some((signature) => {
				const fileHexString = fileBuffer
					.toString("hex")
					.substr(0, signature.length);

				return fileHexString === signature;
			});
		};

		reader.readAsDataURL(file);
		reader.onloadend = () => {
			if (!checkFileFormats(reader.result)) {
				setError("Only '.jpg', '.jpeg', '.png' files are supported.");
			} else {
				setPostImg(reader.result);
			}
		};

		e.target.value = "";
	};

	const submitHandler = (e) => {
		e.preventDefault();
		submitPost();
	};

	useEffect(() => {
		const errorTimeout = setTimeout(() => setError(""), 5000);
		return () => clearTimeout(errorTimeout);
	}, [error]);

	useEffect(() => setCharCounter(postBody.length), [postBody]);

	return (
		<form onSubmit={submitHandler} style={{ marginBottom: "1rem" }}>
			<Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
				<Typography variant="h4" component="h3">
					Create a Post
				</Typography>
				<RouterLink
					to={`/users/${user.username}`}
					style={{ textDecoration: "none" }}
				>
					<Avatar
						src={profileImg}
						sx={{
							height: 45,
							width: 45,
						}}
						children={
							loggedIn ? user.username[0].toUpperCase() : null
						}
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
					maxRows={10}
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

				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "0 0.5rem 0 0.25rem",
					}}
				>
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
					<Typography
						variant="body1"
						color={charCounter > 300 && red["A700"]}
					>
						{charCounter} / 300
					</Typography>
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
					disabled={
						(postBody.length === 0 && !postImg) || charCounter > 300
					}
					variant="outlined"
					type="submit"
				>
					Submit
				</Button>
				{error && (
					<Typography
						variant="body1"
						sx={{
							padding: "0.5rem",
							color: "#fff",
							backgroundColor: red["A700"],
						}}
					>
						{error}
					</Typography>
				)}
				{(loading || userInfoLoading) && !error && (
					<CircularProgress size={30} />
				)}
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
