import React from "react";

const CommentButton = ({ commentCount }) => {
	return (
		<div className="post-item-btns-item-wrap">
			<button type="button" className="post-item-btn post-item-like-btn">
				<i className="far fa-comments post-item-comment-icon"></i>
			</button>
			<p className="post-item-count post-item-comment-count">
				{commentCount}
			</p>
		</div>
	);
};

export default CommentButton;
