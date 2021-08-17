import React, { useContext } from "react";
import moment from "moment";

import personImg from "../assets/person-img.jpg";
import { AuthContext } from "../context/AuthContext";
import { gql, useMutation } from "@apollo/client";

const Post = ({
	post: { id, username, body, commentCount, likeCount, createdAt },
	getPostQuery,
}) => {
	const { user } = useContext(AuthContext);

	const [deletePost, { data, loading, error }] = useMutation(DELETE_POST, {
		variables: {
			postId: id,
		},
		refetchQueries: [getPostQuery, "getPosts"],
	});

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
				<div className="post-item-btns-inner-wrap">
					<div className="post-item-btn-item-wrap">
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
					<div className="post-item-btn-item-wrap">
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
				</div>
				{user.username === username && (
					<div className="post-item-btns-inner-wrap">
						<div className="post-item-btn-item-wrap">
							<button
								type="button"
								className="post-item-btn post-item-delete-btn"
								onClick={deletePost}
							>
								<i className="fas fa-trash-alt post-item-delete-icon"></i>
							</button>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};

const DELETE_POST = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId) {
			id
		}
	}
`;

export default Post;
