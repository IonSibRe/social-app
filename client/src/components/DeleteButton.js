import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import LoaderSpinner from "./utils/LoaderSpinner";

const DeleteButton = ({ id, query }) => {
	const [deletePost, { loading }] = useMutation(DELETE_POST, {
		onError(err) {
			console.log(err);
		},
		variables: {
			postId: id,
		},
		refetchQueries: [query, "getPosts"],
	});

	return (
		<div className="post-item-btns-item-wrap">
			{loading && <LoaderSpinner />}
			<Link
				to="/"
				className="post-item-btn post-item-delete-btn"
				onClick={deletePost}
			>
				<i className="fas fa-trash-alt post-item-delete-icon"></i>
			</Link>
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

export default DeleteButton;
