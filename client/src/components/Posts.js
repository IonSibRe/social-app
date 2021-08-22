import React from "react";
import { gql, useQuery } from "@apollo/client";

import Post from "./Post";
import PostForm from "./PostForm";

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
						return (
							<Post
								post={post}
								key={post.id}
								getPostQuery={GET_POSTS}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};

const GET_POSTS = gql`
	query getPosts {
		getPosts {
			id
			username
			body
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

export default Posts;
