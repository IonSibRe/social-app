import { useQuery } from "@apollo/client";
import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";
import UserInfoCard from "../components/UserInfoCard";
import { GET_POSTS } from "../utils/graphql";
import LoaderSpinner from "../components/utils/LoaderSpinner";
import ResourceError from "../components/ResourceError";
import Post from "../components/Post";

const UserPage = () => {
	const { user } = useContext(UserContext);

	const { loading, err, data } = useQuery(GET_POSTS);

	if (loading)
		return (
			<div className="loader-wrap">
				<LoaderSpinner width={150} />
			</div>
		);

	if (err) return <ResourceError />;

	return (
		<section className="user-section section-center">
			<div className="user-inner-wrap">
				<UserInfoCard />
				<div className="user-posts">
					{data.getPosts
						.filter((post) => post.username === user.username)
						.map((post) => {
							return <Post post={post} key={post.id} />;
						})}
				</div>
			</div>
		</section>
	);
};

export default UserPage;
