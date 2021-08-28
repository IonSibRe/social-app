import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import moment from "moment";

import { AuthContext } from "../context/AuthContext";
import LikeButton from "../components/utils/LikeButton";
import CommentButton from "../components/utils/CommentButton";
import DeleteButton from "../components/utils/DeleteButton";
import LoaderSpinner from "../components/utils/LoaderSpinner";
import ResourceError from "../components/ResourceError";
import personImg from "../assets/person-img.jpg";
import { formatMsFromEpochToFromNow } from "../utils/utilities";

const SinglePost = () => {
	const { id } = useParams();
	const { user } = useContext(AuthContext);
	const [comment, setComment] = useState("");
	const [error, setError] = useState(false);

	const { loading, err, data } = useQuery(GET_POST, {
		variables: {
			postId: id,
		},
	});

	const [createComment] = useMutation(CREATE_COMMENT, {
		onError() {
			setError(true);
		},
		variables: {
			postId: id,
			body: comment,
		},
	});

	const submitHandler = (e) => {
		e.preventDefault();
		createComment();
		setComment("");
	};

	useEffect(() => {
		let timeout = setTimeout(() => {
			setError(false);
		}, 3000);
		return () => clearTimeout(timeout);
	}, [error]);

	if (loading)
		return (
			<div className="loader-wrap">
				<LoaderSpinner width={150} />
			</div>
		);

	if (err) return <ResourceError />;

	return (
		<div className="sp-post-item-wrap">
			<div className="sp-post-item">
				<div className="post-item-header-wrap">
					<div className="post-item-header-info-wrap">
						<h3 className="sp-post-item-username">
							{data.getPost.username}
						</h3>
						<Link className="sp-post-item-time" to={`/posts/${id}`}>
							{formatMsFromEpochToFromNow(data.getPost.createdAt)}
						</Link>
					</div>
					<div className="post-item-header-img-wrap">
						<img
							src={personImg}
							alt="User Img"
							className="post-item-header-img sp-post-item-header-img"
						/>
					</div>
				</div>

				<div className="post-item-body-wrap">
					<p className="sp-post-item-body-text">
						{data.getPost.body}
					</p>
				</div>

				<form className="post-item-btns-wrap sp-post-item-btns-wrap">
					<div className="post-item-btns-inner-wrap">
						<LikeButton
							id={id}
							likes={data.getPost.likes}
							likeCount={data.getPost.likeCount}
						/>
						<CommentButton
							commentCount={data.getPost.commentCount}
							id={id}
						/>
					</div>
					{user && user.username === data.getPost.username && (
						<div className="post-item-btns-inner-wrap">
							<DeleteButton postId={id} />
						</div>
					)}
				</form>
				{user && user.username && (
					<form className="post-item-comment-input-wrap">
						<div className="post-item-comment-input-inner-wrap">
							<input
								type="text"
								className={`post-item-comment-input ${
									error && "input-danger"
								}`}
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							/>
							<button
								type="submit"
								className="post-item-comment-btn"
								onClick={submitHandler}
							>
								Submit
							</button>
						</div>
					</form>
				)}

				<div
					className={`post-item-comment-section ${
						data.getPost.comments.length > 0 &&
						"post-item-comment-section-border"
					}`}
				>
					{data.getPost.comments.map((comment) => {
						const {
							id: commentId,
							username,
							body,
							createdAt,
						} = comment;
						return (
							<div className="post-item-comment" key={commentId}>
								<div className="post-item-comment-header-wrap">
									<div className="post-item-comment-header-inner-wrap">
										<h3 className="post-item-username">
											{username}
										</h3>
										<h4 className="post-item-time">
											{moment(createdAt).fromNow()}
										</h4>
									</div>
									{user && user.username === username && (
										<div className="post-item-comment-header-inner-wrap">
											<DeleteButton
												postId={data.getPost.id}
												commentId={commentId}
											/>
										</div>
									)}
								</div>
								<div className="post-item-comment-body-wrap">
									<p className="post-item-comment-body-text">
										{body}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

const CREATE_COMMENT = gql`
	mutation createComment($postId: ID!, $body: String!) {
		createComment(postId: $postId, body: $body) {
			id
			username
			commentCount
			comments {
				id
				username
				body
				createdAt
			}
		}
	}
`;

export const GET_POST = gql`
	query getPost($postId: ID!) {
		getPost(postId: $postId) {
			id
			username
			body
			commentCount
			likeCount
			comments {
				id
				username
				body
				createdAt
			}
			likes {
				id
				username
				createdAt
			}
			createdAt
		}
	}
`;

export default SinglePost;
