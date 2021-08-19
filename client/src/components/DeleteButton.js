import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import loaderSpinner from "../assets/loader-spinner.gif";

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
		<div className="post-item-btn-item-wrap">
			{loading && (
				<img
					src={loaderSpinner}
					alt="Loader Spinner"
					className="post-item-btns-loader-spinner"
				/>
			)}
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
