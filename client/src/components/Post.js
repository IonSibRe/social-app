import React from "react";
import personImg from "../assets/person-img.jpg";

const Post = () => {
	return (
		<div className="post-item">
			<div className="post-item-header-wrap">
				<div className="post-item-header-info-wrap">
					<h3 className="post-item-header-name">Test User</h3>
					<h4 className="post-item-header-time">1 hour ago</h4>
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
				<p className="post-item-body-text">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Est, tempora?
				</p>
			</div>

			<form className="post-item-btns-wrap">
				<div className="post-item-btn-inner-wrap">
					<button
						type="button"
						className="post-item-btn post-item-like-btn"
					>
						<i className="far fa-heart post-item-like-icon"></i>
					</button>
					<p className="post-item-count post-item-like-count">10</p>
				</div>
				<div className="post-item-btn-inner-wrap">
					<button
						type="button"
						className="post-item-btn post-item-like-btn"
					>
						<i className="far fa-comments post-item-comment-icon"></i>
					</button>
					<p className="post-item-count post-item-comment-count">2</p>
				</div>
			</form>
		</div>
	);
};

export default Post;
