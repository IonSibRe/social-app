import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import moment from "moment";

import { UserContext } from "../context/UserContext";
import LikeButton from "../components/utils/LikeButton";
import CommentButton from "../components/utils/CommentButton";
import DeleteButton from "../components/utils/DeleteButton";
import ResourceError from "../components/ResourceError";
import { formatMsFromEpochToFromNow } from "../utils/utilities";
import { GET_USER_INFO_BY_USERNAME } from "../utils/graphql";
import {
	Avatar,
	Button,
	CircularProgress,
	Container,
	Link,
	Skeleton,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const SinglePost = () => {
	const { id } = useParams();
	const { user } = useContext(UserContext);
	const [profileImg, setProfileImg] = useState("");
	const [comment, setComment] = useState("");
	const [error, setError] = useState(false);

	const { loading, err, data } = useQuery(GET_POST, {
		onCompleted: (data) =>
			getUserInfoByUsername({
				variables: { username: data.getPost.username },
			}),
		variables: {
			postId: id,
		},
		fetchPolicy: "cache-and-network",
	});

	const [getUserInfoByUsername] = useLazyQuery(GET_USER_INFO_BY_USERNAME, {
		onCompleted: (data) => {
			console.log(data);
			setProfileImg(data.getUserInfoByUsername.profileImg);
		},
	});

	const [createComment] = useMutation(CREATE_COMMENT, {
		onError() {
			setError(true);
		},
		variables: {
			postId: id,
			body: comment,
		},
	});

	const submitHandler = (e) => {
		e.preventDefault();
		createComment();
		setComment("");
	};

	useEffect(() => {
		let timeout = setTimeout(() => {
			setError(false);
		}, 1000);
		return () => clearTimeout(timeout);
	}, [error]);

	if (loading)
		return (
			<Box
				sx={{
					width: "100%",
					marginTop: "25vh",
					textAlign: "center",
				}}
			>
				<CircularProgress size={150} />
			</Box>
		);

	if (err) return <ResourceError />;

	return (
		<Container maxWidth="lg">
			<Box
				sx={{
					width: "600px",
					margin: "2rem auto",
					border: "1px solid #767676",
				}}
			>
				<Toolbar
					disableGutters
					sx={{
						justifyContent: "space-between",
						alignItems: "center",
						padding: "0.5rem 1rem",
						borderBottom: "1px solid #767676",
					}}
				>
					<Box>
						<Typography variant="h4" component="h3">
							{data.getPost.username}
						</Typography>
						<Link
							component={RouterLink}
							to={`/posts/${id}`}
							underline="none"
						>
							{formatMsFromEpochToFromNow(data.getPost.createdAt)}
						</Link>
					</Box>
					<RouterLink to={`/users/${data.getPost.username}`}>
						{loading ? (
							<Skeleton
								variant="circular"
								sx={{
									height: 60,
									width: 60,
								}}
							/>
						) : (
							<Avatar
								src={profileImg}
								sx={{
									height: 60,
									width: 60,
								}}
							/>
						)}
					</RouterLink>
				</Toolbar>

				<Box
					sx={{
						padding: "1rem",
						borderBottom: "1px solid #767676",
					}}
				>
					<Typography variant="body1" mb="0.5rem">
						{data.getPost.body}
					</Typography>
					{data.getPost.img && (
						<img
							src={data.getPost.img}
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
						padding: "0.25rem 1rem",
						borderBottom: "1px solid #767676",
					}}
				>
					<Box
						sx={{
							display: "flex",
							position: "relative",
							left: "-8px",
						}}
					>
						<LikeButton
							id={id}
							likes={data.getPost.likes}
							likeCount={data.getPost.likeCount}
						/>
						<CommentButton
							id={id}
							commentCount={data.getPost.commentCount}
						/>
					</Box>
					{user && user.username === data.getPost.username && (
						<Box>
							<DeleteButton postId={id} />
						</Box>
					)}
				</Box>

				{user && user.username && (
					<Box sx={{ margin: "1rem 0", padding: "0 1rem" }}>
						<Typography variant="h5" component="h4" mb="0.5rem">
							Post a comment
						</Typography>
						<form onSubmit={submitHandler}>
							<Box
								sx={{
									display: "flex",
								}}
							>
								<TextField
									sx={{
										".css-11d37uv-MuiInputBase-root-MuiOutlinedInput-root":
											{
												borderTopRightRadius: 0,
												borderBottomRightRadius: 0,
											},
									}}
									type="text"
									error={error}
									size="small"
									fullWidth
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								/>
								<Button
									sx={{
										borderTopLeftRadius: 0,
										borderBottomLeftRadius: 0,
									}}
									variant="outlined"
									type="button"
								>
									Submit
								</Button>
							</Box>
						</form>
					</Box>
				)}

				<Box
					sx={{
						padding: "1rem",
						borderTop:
							data.getPost.comments.length > 0
								? "1px solid #767676"
								: "0",
					}}
				>
					{data.getPost.comments.map((comment) => {
						const {
							id: commentId,
							username,
							body,
							createdAt,
						} = comment;
						return (
							<Box
								key={commentId}
								sx={{
									marginBottom: "1rem",
									padding: "0.5rem",
									border: "1px solid #767676",
									"&:last-child": {
										marginBottom: "0",
									},
								}}
							>
								<Toolbar
									disableGutters
									sx={{ justifyContent: "space-between" }}
								>
									<Box>
										<Typography component="h4" variant="h5">
											{username}
										</Typography>
										<Typography
											component="h4"
											variant="h6"
											color="primary"
										>
											{moment(createdAt).fromNow()}
										</Typography>
									</Box>
									{user && user.username === username && (
										<DeleteButton
											postId={data.getPost.id}
											commentId={commentId}
										/>
									)}
								</Toolbar>
								<Typography
									variant="body1"
									my="0.5rem"
									sx={{ wordWrap: "break-word" }}
								>
									{body}
								</Typography>
							</Box>
						);
					})}
				</Box>
			</Box>
		</Container>
	);
};

const CREATE_COMMENT = gql`
	mutation createComment($postId: ID!, $body: String!) {
		createComment(postId: $postId, body: $body) {
			id
			username
			commentCount
			comments {
				id
				username
				body
				createdAt
			}
		}
	}
`;

export const GET_POST = gql`
	query getPost($postId: ID!) {
		getPost(postId: $postId) {
			id
			username
			body
			img
			commentCount
			likeCount
			comments {
				id
				username
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

export default SinglePost;
