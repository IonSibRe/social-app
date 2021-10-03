import React, { useContext, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import LoaderSpinner from "./utils/LoaderSpinner";
import { GET_USERS_POSTS, GET_USER_INFO_BY_USERNAME } from "../utils/graphql";
import ProfileImage from "./utils/ProfileImage";

const PostForm = () => {
	const { user } = useContext(UserContext);

	const [postBody, setPostBody] = useState("");
	const [profileImg, setProfileImg] = useState("");
	const [error, setError] = useState(false);

	const [submitPost, { loading }] = useMutation(CREATE_POST, {
		onError: () => setError(true),
		update(cache, { data }) {
			const posts = cache.readQuery({ query: GET_USERS_POSTS });
			cache.writeQuery({
				query: GET_USERS_POSTS,
				data: {
					getUsersPosts: [...posts.getUsersPosts, data.createPost],
				},
			});
		},

		variables: {
			body: postBody,
		},
	});

	const { loading: userInfoLoading } = useQuery(GET_USER_INFO_BY_USERNAME, {
		onCompleted: (data) => {
			if (data.getUserInfoByUsername.profileImg)
				setProfileImg(data.getUserInfoByUsername.profileImg);
		},
		variables: { username: user.username },
	});

	const submitHandler = (e) => {
		e.preventDefault();
		submitPost();
		setPostBody("");
	};

	useEffect(() => {
		const errorTimeout = setTimeout(() => setError(false), 1000);
		return () => clearTimeout(errorTimeout);
	}, [error]);

	return (
		<form className="posts-submit-wrap" onSubmit={submitHandler}>
			<div className="posts-submit-title-wrap">
				<h2 className="posts-submit-title">Create a Post</h2>
				<div className="posts-submit-profile-img-wrap">
					<Link to={`/users/${user.username}`}>
						<ProfileImage profileImg={profileImg} />
					</Link>
				</div>
			</div>
			<input
				type="text"
				className={`posts-submit-input ${error && "input-danger"}`}
				value={postBody}
				onChange={(e) => setPostBody(e.target.value)}
			/>
			<div className="posts-submit-btn-wrap">
				<button type="submit" className="posts-submit-btn">
					Submit
				</button>
				{(loading || userInfoLoading) && <LoaderSpinner />}
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
