import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/AuthContext";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import DeleteButton from "./DeleteButton";
import personImg from "../assets/person-img.jpg";

const Post = ({
	post: { id, username, body, commentCount, likeCount, createdAt },
	getPostQuery,
}) => {
	const { user } = useContext(AuthContext);

	return (
		<div className="post-item">
			<div className="post-item-header-wrap">
				<div className="post-item-header-info-wrap">
					<h3 className="post-item-header-name">{username}</h3>
					<Link className="post-item-header-time" to={`/${id}`}>
						{moment(new Date(parseInt(createdAt))).fromNow()}
					</Link>
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
				<div className="post-item-btns-inner-wrap">
					<LikeButton likeCount={likeCount} />
					<CommentButton commentCount={commentCount} />
				</div>
				{user.username === username && (
					<div className="post-item-btns-inner-wrap">
						<DeleteButton id={id} query={getPostQuery} />
					</div>
				)}
			</form>
		</div>
	);
};

export default Post;
