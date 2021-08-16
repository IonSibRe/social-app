const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

const postMutationResolvers = {
	Mutation: {
		async createPost(_, { body }, context) {
			const user = checkAuth(context);

			if (body.trim() === "") throw new Error("Post mustn't be empty");

			const newUser = await Post.create({
				username: user.username,
				body,
				commentCount: 0,
				likeCount: 0,
				comments: [],
				likes: [],
			});

			return newUser;
		},

		async deletePost(_, { postId }, context) {
			const user = checkAuth(context);

			try {
				const post = await Post.findById(postId);
				if (!post) throw new Error("Post Not Found");

				if (user.username === post.username) {
					await post.remove();
					return post;
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

module.exports = postMutationResolvers;
