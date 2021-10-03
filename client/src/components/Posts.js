import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

import Post from "./Post";
import PostForm from "./PostForm";
import ResourceError from "./ResourceError";
import { GET_USERS_POSTS } from "../utils/graphql";
import LoaderSpinner from "./utils/LoaderSpinner";
import { UserContext } from "../context/UserContext";

const Posts = () => {
	const { user } = useContext(UserContext);

	const { loading, err, data } = useQuery(GET_USERS_POSTS);

	if (loading)
		return (
			<div className="loader-wrap">
				<LoaderSpinner width={150} />
			</div>
		);

	if (err) return <ResourceError />;

	return (
		<section className="posts-section section-center">
			<div className="posts-inner-wrap">
				<div className="posts-header-wrap">
					<h1 className="posts-header-title">Home</h1>
				</div>

				{user && user.username && <PostForm />}

				<div className="posts-list">
					{data.getUsersPosts.map((post) => {
						return <Post post={post} key={post.id} />;
					})}
				</div>
			</div>
		</section>
	);
};

export default Posts;
