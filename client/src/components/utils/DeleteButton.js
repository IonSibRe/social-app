import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router";

import LoaderSpinner from "../utils/LoaderSpinner";

const DeleteButton = ({ postId, commentId }) => {
	let history = useHistory();
	const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

	const [deletePostOrComment, { loading }] = useMutation(mutation, {
		update(cache) {
			if (!commentId) {
				cache.modify({
					fields: {
						getUsersPosts: (list, { readField }) =>
							list.filter(
								(item) => readField("id", item) !== postId
							),
					},
				});
			}
		},
		variables: {
			postId,
			commentId,
		},
	});

	const deletePostFunc = () => {
		deletePostOrComment();
		if (!commentId && window.location.pathname.split("/")[1] === "posts") {
			history.push("/");
		}
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

const DELETE_COMMENT = gql`
	mutation deleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
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

export default DeleteButton;
