import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import moment from "moment";

import { AuthContext } from "../context/AuthContext";
import LikeButton from "../components/LikeButton";
import CommentButton from "../components/CommentButton";
import DeleteButton from "../components/DeleteButton";
import personImg from "../assets/person-img.jpg";

const SinglePost = () => {
	const { id } = useParams();
	const { user } = useContext(AuthContext);

	const { loading, err, data } = useQuery(GET_POST, {
		variables: {
			postId: id,
		},
	});

	if (loading) return <h1>Loading</h1>;
	if (err) console.log(err);

	return (
		<section className="sp-section section-center">
			<div className="sp-post-wrap">
				<div className="sp-post-header-wrap">
					<div className="sp-post-header-img-wrap">
						<img
							src={personImg}
							alt="User Img"
							className="sp-post-img"
						/>
					</div>
					<div className="sp-post-header-text-wrap">
						<h3 className="sp-post-username">
							{data.getPost.username}
						</h3>
						<h4 className="sp-post-time">
							{moment(
								new Date(parseInt(data.getPost.createdAt))
							).fromNow()}
						</h4>
					</div>
				</div>
				<div className="sp-post-content-wrap">
					<p className="sp-post-text">{data.getPost.body}</p>
				</div>
				<form className="post-item-btns-wrap">
					<div className="post-item-btns-inner-wrap">
						<LikeButton likeCount={data.getPost.likeCount} />
						<CommentButton
							commentCount={data.getPost.commentCount}
						/>
					</div>
					{user.username === data.getPost.username && (
						<div className="post-item-btns-inner-wrap">
							<DeleteButton id={id} query={GET_POST} />
						</div>
					)}
				</form>
				<form className="sp-post-comment-input-wrap">
					<h3 className="sp-post-comment-title">Comment on Post</h3>
					<div className="sp-post-comment-input-inner-wrap">
						<input type="text" className="sp-post-comment-input" />
						<button type="submit" className="sp-post-comment-btn">
							Submit
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

const GET_POST = gql`
	query getPost($postId: ID!) {
		getPost(postId: $postId) {
			id
			username
			body
			commentCount
			likeCount
			comments {
				id
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
