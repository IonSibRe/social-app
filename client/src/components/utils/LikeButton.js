import { gql, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const LikeButton = ({ id, likes, likeCount }) => {
	const { user } = useContext(UserContext);
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		if (user && user.username) {
			setLiked(
				likes.find((like) => like.username === user.username)
					? true
					: false
			);
		}
	}, [likes, user]);

	const [likePost] = useMutation(LIKE_POST, {
		variables: {
			postId: id,
		},
	});

	return (
		<div className="post-item-btns-item-wrap">
			{user && user.username ? (
				<button
					type="button"
					className="post-item-btn post-item-like-btn"
					onClick={() => likePost()}
				>
					<i
						className={`fa${
							liked ? "s" : "r"
						} fa-heart post-item-like-icon ${liked && "liked"}`}
					></i>
				</button>
			) : (
				<Link className="post-item-btn post-item-like-btn" to="/login">
					<i className="far fa-heart post-item-like-icon"></i>
				</Link>
			)}
			<p className="post-item-count post-item-like-count">{likeCount}</p>
		</div>
	);
};

const LIKE_POST = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			username
			likeCount
			likes {
				id
				username
				createdAt
			}
		}
	}
`;

export default LikeButton;