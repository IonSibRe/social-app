const { UserInputError, ApolloError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

const postMutationResolvers = {
	Mutation: {
		async createPost(_, { body }, context) {
			const user = checkAuth(context);

			if (body.trim() === "")
				throw new UserInputError("InputError", {
					errMsg: "Post body mustn't be empty",
				});

			const post = new Post({
				username: user.username,
				body,
				commentCount: 0,
				likeCount: 0,
				comments: [],
				likes: [],
			});

			const newPost = await post.save();

			return newPost;
		},

		async deletePost(_, { postId }, context) {
			const user = checkAuth(context);

			try {
				const post = await Post.findById(postId);
				if (!post) throw new ApolloError("Post Not Found");

				if (user.username === post.username) {
					await post.remove();
					return post;
				}
			} catch (err) {
				throw new Error(err);
			}
		},

		async likePost(_, { postId }, context) {
			const user = checkAuth(context);

			try {
				const post = await Post.findById(postId);
				if (!post) throw new ApolloError("Post Not Found");

				const liked = post.likes.find(
					(like) => like.username === user.username
				);

				if (liked) {
					post.likes = post.likes.filter(
						(like) => like.username !== user.username
					);
				} else {
					post.likes.push({
						username: user.username,
						createdAt: new Date().toISOString(),
					});
				}

				await post.save();
				return post;
			} catch (err) {
				throw new Error(err);
			}
		},

		async createComment(_, { postId, body }, context) {
			const user = checkAuth(context);

			if (body.trim() === "")
				throw new UserInputError("InputError", {
					errMsg: "Comment body mustn't be empty",
				});

			try {
				const post = await Post.findById(postId);
				if (!post) throw new ApolloError("Post Not Found");

				post.comments.push({
					username: user.username,
					body,
					createdAt: new Date().toISOString(),
				});

				await post.save();
				return post;
			} catch (err) {
				throw new Error(err);
			}
		},

		async deleteComment(_, { postId, commentId }, context) {
			const user = checkAuth(context);

			try {
				const post = await Post.findById(postId);
				if (!post) throw new ApolloError("Post Not Found");

				const deleteComment = post.comments.find(
					(comment) => comment.id === commentId
				);

				if (user.username === deleteComment.username) {
					post.comments = post.comments.filter(
						(comment) => comment.id !== commentId
					);
				}

				await post.save();
				return post;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

module.exports = postMutationResolvers;
