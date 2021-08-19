import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

import loaderSpinner from "../assets/loader-spinner.gif";

const PostForm = ({ getPostQuery }) => {
	const [postBody, setPostBody] = useState("");

	const [submitPost, { loading }] = useMutation(CREATE_POST, {
		onError(err) {
			console.log(err);
		},
		variables: {
			body: postBody,
		},
		refetchQueries: [getPostQuery, "getPosts"],
	});

	const submitHandler = (e) => {
		e.preventDefault();
		submitPost();
		setPostBody("");
	};

	return (
		<form className="posts-submit-wrap" onSubmit={submitHandler}>
			<h2 className="posts-submit-title">Create a Post</h2>
			<input
				type="text"
				className="posts-submit-input"
				value={postBody}
				onChange={(e) => setPostBody(e.target.value)}
			/>
			<div className="posts-submit-btn-wrap">
				<button type="submit" className="posts-submit-btn">
					Submit
				</button>
				{loading && (
					<img
						src={loaderSpinner}
						alt="Loader Spinner"
						className="post-submit-loader-spinner"
					/>
				)}
			</div>
		</form>
	);
};

const CREATE_POST = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
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

export default PostForm;
