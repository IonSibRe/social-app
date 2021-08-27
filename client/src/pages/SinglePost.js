import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import moment from "moment";

import { AuthContext } from "../context/AuthContext";
import LikeButton from "../components/LikeButton";
import CommentButton from "../components/CommentButton";
import DeleteButton from "../components/DeleteButton";
import personImg from "../assets/person-img.jpg";

const SinglePost = () => {
	const { id } = useParams();
	const { user } = useContext(AuthContext);
	const [comment, setComment] = useState("");

	const { loading, err, data } = useQuery(GET_POST, {
		variables: {
			postId: id,
		},
	});

	const [createComment] = useMutation(CREATE_COMMENT, {
		onError(err) {
			console.log(err);
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

	if (loading) return <h1>Loading</h1>;
	if (err) console.log(err);

	return (
		<div className="sp-post-item-wrap">
			<div className="sp-post-item">
				<div className="post-item-header-wrap">
					<div className="post-item-header-info-wrap">
						<h3 className="sp-post-item-username">
							{data.getPost.username}
						</h3>
						<Link className="sp-post-item-time" to={`/posts/${id}`}>
							{moment(
								new Date(parseInt(data.getPost.createdAt))
							).fromNow()}
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
					{user.username === data.getPost.username && (
						<div className="post-item-btns-inner-wrap">
							<DeleteButton postId={id} />
						</div>
					)}
				</form>

				<form className="post-item-comment-input-wrap">
					<div className="post-item-comment-input-inner-wrap">
						<input
							type="text"
							className="post-item-comment-input"
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

				<div className="post-item-comment-section">
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
