import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router";

import { GET_POST, GET_POSTS } from "./utils/graphql";
import LoaderSpinner from "./utils/LoaderSpinner";

const DeleteButton = ({ postId, commentId }) => {
	let history = useHistory();
	const query = commentId ? GET_POST : GET_POSTS;
	const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

	const [deletePostOrComment, { loading }] = useMutation(mutation, {
		onError(err) {
			console.log(err);
		},
		variables: {
			postId,
			commentId,
		},
		refetchQueries: [query, `${commentId ? "getPost" : "getPosts"}`],
	});

	const deletePostFunc = () => {
		deletePostOrComment();
		if (!commentId) history.push("/");
	};

	return (
		<div className="post-item-btns-item-wrap">
			{loading && <LoaderSpinner />}
			<button
				to="/"
				type="button"
				className="post-item-btn post-item-delete-btn"
				onClick={deletePostFunc}
			>
				<i className="fas fa-trash-alt post-item-delete-icon"></i>
			</button>
		</div>
	);
};

const DELETE_POST = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId) {
			id
		}
	}
`;

const DELETE_COMMENT = gql`
	mutation deleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			id
		}
	}
`;

export default DeleteButton;
