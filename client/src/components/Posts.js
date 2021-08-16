import React from "react";
import Post from "./Post";
import PostForm from "./PostForm";

const Posts = () => {
	return (
		<section className="posts-section section-center">
			<div className="posts-inner-wrap">
				<div className="posts-header-wrap">
					<h1 className="posts-header-title">Home</h1>
				</div>

				<PostForm />

				<div className="posts-list">
					<Post />
					<Post />
					<Post />
				</div>
			</div>
		</section>
	);
};

export default Posts;
