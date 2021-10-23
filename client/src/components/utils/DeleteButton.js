import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router";

import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress, IconButton } from "@mui/material";
import { Box } from "@mui/system";

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
		<Box sx={{ display: "flex", alignItems: "center" }}>
			{loading && <CircularProgress size={20} />}
			<IconButton color="primary" size="medium" onClick={deletePostFunc}>
				<DeleteIcon />
			</IconButton>
		</Box>
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
