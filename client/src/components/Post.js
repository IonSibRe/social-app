import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import LikeButton from "./utils/LikeButton";
import CommentButton from "./utils/CommentButton";
import DeleteButton from "./utils/DeleteButton";
import { formatMsFromEpochToFromNow } from "../utils/utilities";
import ProfileImage from "./utils/ProfileImage";

const Post = ({
	post: { id, username, body, commentCount, likes, likeCount, createdAt },
}) => {
	const { user } = useContext(UserContext);

	return (
		<div className="post-item">
			<div className="post-item-header-wrap">
				<div className="post-item-header-info-wrap">
					<h3 className="post-item-username">{username}</h3>
					<Link className="post-item-time" to={`/posts/${id}`}>
						{formatMsFromEpochToFromNow(createdAt)}
					</Link>
				</div>
				<Link
					to={`/users/${username}`}
					className="post-item-header-img-wrap"
				>
					<ProfileImage />
				</Link>
			</div>

			<div className="post-item-body-wrap">
				<p className="post-item-body-text">{body}</p>
			</div>

			<form className="post-item-btns-wrap">
				<div className="post-item-btns-inner-wrap">
					<LikeButton id={id} likes={likes} likeCount={likeCount} />
					<CommentButton id={id} commentCount={commentCount} />
				</div>
				{user && user.username === username && (
					<div className="post-item-btns-inner-wrap">
						<DeleteButton postId={id} />
					</div>
				)}
			</form>
		</div>
	);
};

export default Post;
