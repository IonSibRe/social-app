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
		},
		comments: [
			{
				id: {
					type: String,
					required: true,
				},
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
		},
		likes: [
			{
				id: {
					type: String,
					required: true,
				},
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
