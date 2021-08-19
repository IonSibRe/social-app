import React from "react";

const LikeButton = ({ likeCount }) => {
	return (
		<div className="post-item-btn-item-wrap">
			<button type="button" className="post-item-btn post-item-like-btn">
				<i className="far fa-heart post-item-like-icon"></i>
			</button>
			<p className="post-item-count post-item-like-count">{likeCount}</p>
		</div>
	);
};

export default LikeButton;
