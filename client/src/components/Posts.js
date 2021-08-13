import React from "react";
import Post from "./Post";

const Posts = () => {
	return (
		<section className="posts-section section-center">
			<div className="posts-inner-wrap">
				<div className="posts-header-wrap">
					<h1 className="posts-header-title">Home</h1>
				</div>

				<form className="posts-submit-wrap">
					<h2 className="posts-submit-title">Create a Post</h2>
					<input type="text" className="posts-submit-input" />
					<button type="submit" className="posts-submit-btn">
						Submit
					</button>
				</form>

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
