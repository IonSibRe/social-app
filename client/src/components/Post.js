import React from "react";
import moment from "moment";

import personImg from "../assets/person-img.jpg";

const Post = ({
	post: { username, body, commentCount, likeCount, createdAt },
}) => {
	return (
		<div className="post-item">
			<div className="post-item-header-wrap">
				<div className="post-item-header-info-wrap">
					<h3 className="post-item-header-name">{username}</h3>
					<h4 className="post-item-header-time">
						{moment(new Date(parseInt(createdAt))).fromNow()}
					</h4>
				</div>
				<div className="post-item-header-img-wrap">
					<img
						src={personImg}
						alt="Sample Person Img"
						className="post-item-header-img"
					/>
				</div>
			</div>

			<div className="post-item-body-wrap">
				<p className="post-item-body-text">{body}</p>
			</div>

			<form className="post-item-btns-wrap">
				<div className="post-item-btn-inner-wrap">
					<button
						type="button"
						className="post-item-btn post-item-like-btn"
					>
						<i className="far fa-heart post-item-like-icon"></i>
					</button>
					<p className="post-item-count post-item-like-count">
						{likeCount}
					</p>
				</div>
				<div className="post-item-btn-inner-wrap">
					<button
						type="button"
						className="post-item-btn post-item-like-btn"
					>
						<i className="far fa-comments post-item-comment-icon"></i>
					</button>
					<p className="post-item-count post-item-comment-count">
						{commentCount}
					</p>
				</div>
			</form>
		</div>
	);
};

export default Post;
