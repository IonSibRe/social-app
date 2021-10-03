const { ApolloError } = require("apollo-server");
const checkAuth = require("../../utils/checkAuth");
const Post = require("../../models/Post");
const User = require("../../models/User");

const postQueryResolvers = {
	Query: {
		async getAllPosts() {
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
				if (!post) throw new ApolloError("Post Not Found");

				return post;
			} catch (err) {
				throw new Error(err);
			}
		},

		async getUsersPosts(_, __, context) {
			const { id, username } = checkAuth(context);

			const user = await User.findById(id);
			if (!user) throw new ApolloError("User Not Found");

			let posts = await Post.find().where("username").in(user.following);
			const usersPosts = await Post.find({ username });

			posts = [...posts, ...usersPosts];

			return posts;
		},
	},
};

module.exports = postQueryResolvers;
