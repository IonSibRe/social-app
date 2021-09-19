import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import LikeButton from "./utils/LikeButton";
import CommentButton from "./utils/CommentButton";
import DeleteButton from "./utils/DeleteButton";
import { formatMsFromEpochToFromNow } from "../utils/utilities";
import ProfileImage from "./utils/ProfileImage";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO_BY_USERNAME } from "../utils/graphql";
import LoaderSpinner from "./utils/LoaderSpinner";

const Post = ({
	post: { id, username, body, commentCount, likes, likeCount, createdAt },
}) => {
	const { user } = useContext(UserContext);
	const [profileImg, setProfileImg] = useState("");

	const { loading } = useQuery(GET_USER_INFO_BY_USERNAME, {
		onCompleted: (data) =>
			setProfileImg(data.getUserInfoByUsername.profileImg),
		variables: { username },
	});

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
					{loading ? (
						<LoaderSpinner />
					) : (
						<ProfileImage profileImg={profileImg} />
					)}
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
