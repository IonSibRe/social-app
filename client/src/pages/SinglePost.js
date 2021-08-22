import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
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
						<LikeButton likeCount={data.getPost.likeCount} />
						<CommentButton
							commentCount={data.getPost.commentCount}
						/>
					</div>
					{user.username === data.getPost.username && (
						<div className="post-item-btns-inner-wrap">
							<DeleteButton id={id} query={""} />
						</div>
					)}
				</form>

				<form className="post-item-comment-input-wrap">
					<div className="post-item-comment-input-inner-wrap">
						<input
							type="text"
							className="post-item-comment-input"
						/>
						<button type="submit" className="post-item-comment-btn">
							Submit
						</button>
					</div>
				</form>

				<div className="post-item-comment-section">
					<div className="post-item-comment">
						<div className="post-item-comment-header-wrap">
							<div className="post-item-comment-header-inner-wrap">
								<h3 className="post-item-username">test123</h3>
								<h4 className="post-item-time">
									30 minutes ago
								</h4>
							</div>
							<div className="post-item-comment-header-inner-wrap">
								<DeleteButton />
							</div>
						</div>
						<div className="post-item-comment-body-wrap">
							<p className="post-item-comment-body-text">
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Deserunt quo accusantium
								debitis accusamus iste aperiam error beatae
								exercitationem minima quis!
							</p>
						</div>
					</div>
					<div className="post-item-comment">
						<div className="post-item-comment-header-wrap">
							<div className="post-item-comment-header-inner-wrap">
								<h3 className="post-item-username">test123</h3>
								<h4 className="post-item-time">
									30 minutes ago
								</h4>
							</div>
							<div className="post-item-comment-header-inner-wrap">
								<DeleteButton />
							</div>
						</div>
						<div className="post-item-comment-body-wrap">
							<p className="post-item-comment-body-text">
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Deserunt quo accusantium
								debitis accusamus iste aperiam error beatae
								exercitationem minima quis!
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
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
