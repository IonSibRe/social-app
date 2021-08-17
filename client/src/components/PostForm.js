import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const PostForm = ({ getPostQuery }) => {
	const [postBody, setPostBody] = useState("");

	const [submitPost, { data, loading, error }] = useMutation(CREATE_POST, {
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
			<button type="submit" className="posts-submit-btn">
				Submit
			</button>
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
