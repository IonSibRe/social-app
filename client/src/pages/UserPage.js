import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router";

import UserInfoCard from "../components/UserInfoCard";
import Post from "../components/Post";
import LoaderSpinner from "../components/utils/LoaderSpinner";
import ResourceError from "../components/ResourceError";
import { GET_POSTS } from "../utils/graphql";

const UserPage = () => {
	const { username } = useParams();
	const [cardData, setCardData] = useState({});

	const { loading, err, data } = useQuery(GET_POSTS);
	const { loading: cardLoading, err: cardErr } = useQuery(
		GET_USER_CARD_INFO,
		{
			onCompleted: (data) => setCardData(data.getUserCardInfo),
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
		<section className="user-section section-center">
			<div className="user-inner-wrap">
				<UserInfoCard cardData={cardData} />
				<div className="user-posts">
					{data.getPosts
						.filter((post) => post.username === username)
						.map((post) => {
							return <Post post={post} key={post.id} />;
						})}
				</div>
			</div>
		</section>
	);
};

export default UserPage;

const GET_USER_CARD_INFO = gql`
	query getUserCardInfo($username: String!) {
		getUserCardInfo(username: $username) {
			username
			profileImg
		}
	}
`;
