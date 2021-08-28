import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CommentButton = ({ id, commentCount }) => {
	const { user } = useContext(AuthContext);

	return (
		<div className="post-item-btns-item-wrap">
			{user && user.username ? (
				<>
					<Link
						to={`/posts/${id}`}
						type="button"
						className="post-item-btn post-item-like-btn"
					>
						<i className="far fa-comments post-item-comment-icon"></i>
					</Link>
					<p className="post-item-count post-item-comment-count">
						{commentCount}
					</p>
				</>
			) : (
				<>
					<Link
						to="/login"
						type="button"
						className="post-item-btn post-item-like-btn"
					>
						<i className="far fa-comments post-item-comment-icon"></i>
					</Link>
					<p className="post-item-count post-item-comment-count">
						{commentCount}
					</p>
				</>
			)}
		</div>
	);
};

export default CommentButton;
