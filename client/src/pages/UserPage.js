import React, { useState } from "react";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";

import UserInfoCard from "../components/UserInfoCard";
import Post from "../components/Post";
import ResourceError from "../components/ResourceError";
import { GET_USER_INFO_BY_USERNAME } from "../utils/graphql";
import { Box, CircularProgress, Container } from "@mui/material";

const UserPage = () => {
	const { username } = useParams();
	const [cardData, setCardData] = useState({});

	const { loading, err, data } = useQuery(GET_USERS_POSTS_PUBLIC, {
		onError: (err) => console.log(err),
		variables: { username },
	});
	const { loading: cardLoading, err: cardErr } = useQuery(
		GET_USER_INFO_BY_USERNAME,
		{
			onCompleted: (data) => setCardData(data.getUserInfoByUsername),
			onError: (err) => console.log(err),
			variables: { username },
		}
	);

	if (loading || cardLoading)
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

	if (err || cardErr) return <ResourceError />;

	return (
		<Container maxWidth="sm" sx={{ marginTop: "1rem" }}>
			<Box>
				<UserInfoCard cardData={cardData} />
				<div className="user-posts">
					{data.getUsersPostsPublic
						.filter((post) => post.username === username)
						.map((post) => {
							return <Post post={post} key={post.id} />;
						})}
				</div>
			</Box>
		</Container>
	);
};

export default UserPage;

const GET_USERS_POSTS_PUBLIC = gql`
	query getUsersPostsPublic($username: String!) {
		getUsersPostsPublic(username: $username) {
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
