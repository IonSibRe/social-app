import React from "react";
import { useQuery } from "@apollo/client";

import Post from "./Post";
import PostForm from "./PostForm";
import { GET_POSTS } from "./utils/graphql";

const Posts = () => {
	const { loading, err, data } = useQuery(GET_POSTS);

	if (loading) return <h1>Loading</h1>;
	if (err) console.log(err);

	return (
		<section className="posts-section section-center">
			<div className="posts-inner-wrap">
				<div className="posts-header-wrap">
					<h1 className="posts-header-title">Home</h1>
				</div>

				<PostForm />

				<div className="posts-list">
					{data.getPosts.map((post) => {
						return <Post post={post} key={post.id} />;
					})}
				</div>
			</div>
		</section>
	);
};

export default Posts;
