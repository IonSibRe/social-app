import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import LoaderSpinner from "./utils/LoaderSpinner";
import { GET_POSTS } from "../utils/graphql";
import personImg from "../assets/person-img.jpg";

const PostForm = () => {
	const { user } = useContext(UserContext);
	const [postBody, setPostBody] = useState("");

	const [submitPost, { loading }] = useMutation(CREATE_POST, {
		update(cache, { data }) {
			const posts = cache.readQuery({ query: GET_POSTS });
			cache.writeQuery({
				query: GET_POSTS,
				data: { getPosts: [...posts.getPosts, data.createPost] },
			});
		},

		variables: {
			body: postBody,
		},
	});

	const submitHandler = (e) => {
		e.preventDefault();
		submitPost();
		setPostBody("");
	};

	return (
		<form className="posts-submit-wrap" onSubmit={submitHandler}>
			<div className="posts-submit-title-wrap">
				<h2 className="posts-submit-title">Create a Post</h2>
				<Link to={`/users/${user.username}`}>
					<img
						src={personImg}
						alt="User Img"
						className="posts-submit-profile-img"
					/>
				</Link>
			</div>
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
				{loading && <LoaderSpinner />}
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
