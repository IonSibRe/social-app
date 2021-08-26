import React from "react";
import { Link } from "react-router-dom";

const CommentButton = ({ id, commentCount }) => {
	return (
		<div className="post-item-btns-item-wrap">
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
		</div>
	);
};

export default CommentButton;
