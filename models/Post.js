const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		commentCount: {
			type: Number,
			required: true,
		},
		comments: [
			{
				username: {
					type: String,
					required: true,
				},
				body: {
					type: String,
					required: true,
				},
				createdAt: {
					type: String,
					required: true,
				},
			},
		],
		likeCount: {
			type: Number,
			required: true,
		},
		likes: [
			{
				username: {
					type: String,
					required: true,
				},
				createdAt: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ timestamps: true, collection: "posts" }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
