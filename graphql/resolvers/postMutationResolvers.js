const { UserInputError, ApolloError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");
const { cloudinary } = require("../../utils/cloudinary");
const { checkFileFormats } = require("../../utils/utils");

const postMutationResolvers = {
	Mutation: {
		async createPost(_, { body, base64File }, context) {
			const user = checkAuth(context);
			let uploadedRes;

			if (body.trim() === "")
				throw new UserInputError("InputError", {
					errMsg: "Post body mustn't be empty",
				});

			if (body.length > 300) {
				throw new UserInputError("InputError", {
					errMsg: "Post body must have less than 300 characters",
				});
			}

			// Check File formats
			if (base64File && !checkFileFormats(base64File))
				throw new ApolloError(
					"Unsupported image format. Only supports '.jpg', '.jpeg', '.png' "
				);

			// Upload Image if there is one
			if (base64File) {
				uploadedRes = await cloudinary.uploader.upload(base64File, {
					folder: "social-app/post-images",
					upload_preset: "social-app",
				});
			}

			const post = new Post({
				username: user.username,
				body,
				img: uploadedRes ? uploadedRes.secure_url : "",
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
					// Remove Img from cloudinary
					if (post.img) {
						const publicId = post.img
							.split("/")
							[post.img.split("/").length - 1].split(".")[0];

						await cloudinary.uploader.destroy(
							`social-app/post-images/${publicId}`
						);
					}

					// Remove post from DB
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
