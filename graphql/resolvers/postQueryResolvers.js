const Post = require("../../models/Post");

const postQueryResolvers = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find();
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},

		async getPost(_, { postId }) {
			try {
				const post = await Post.findById(postId);
				if (!post) throw new Error("Post Not Found");

				return post;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

module.exports = postQueryResolvers;
