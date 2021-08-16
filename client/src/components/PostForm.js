import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const PostForm = () => {
	const [inputBody, setInputBody] = useState("");

	return (
		<form className="posts-submit-wrap">
			<h2 className="posts-submit-title">Create a Post</h2>
			<input
				type="text"
				className="posts-submit-input"
				onChange={(e) => setInputBody(e.target.value)}
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
