import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router";

import UserInfoCard from "../components/UserInfoCard";
import Post from "../components/Post";
import LoaderSpinner from "../components/utils/LoaderSpinner";
import ResourceError from "../components/ResourceError";
import { GET_USERS_POSTS, GET_USER_INFO_BY_USERNAME } from "../utils/graphql";
import { Container } from "@mui/material";
import { Box } from "@mui/system";

const UserPage = () => {
	const { username } = useParams();
	const [cardData, setCardData] = useState({});

	const { loading, err, data } = useQuery(GET_USERS_POSTS);
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
			<div className="loader-wrap">
				<LoaderSpinner width={150} />
			</div>
		);

	if (err || cardErr) return <ResourceError />;

	return (
		<Container maxWidth="sm" sx={{ marginTop: "1rem" }}>
			<Box>
				<UserInfoCard cardData={cardData} />
				<div className="user-posts">
					{data.getUsersPosts
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
