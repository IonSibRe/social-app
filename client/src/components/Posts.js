import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

import Post from "./Post";
import PostForm from "./PostForm";
import ResourceError from "./ResourceError";
import { GET_USERS_POSTS } from "../utils/graphql";
import LoaderSpinner from "./utils/LoaderSpinner";
import { UserContext } from "../context/UserContext";
import { Container, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

const Posts = () => {
	const { user } = useContext(UserContext);

	const { loading, err, data } = useQuery(GET_USERS_POSTS);

	const mediaQuerySmMatch = useMediaQuery("(max-width: 500px)");

	if (loading)
		return (
			<div className="loader-wrap">
				<LoaderSpinner width={150} />
			</div>
		);

	if (err) return <ResourceError />;

	return (
		<Container maxWidth="lg">
			<Box
				sx={{
					width: mediaQuerySmMatch ? "100%" : "500px",
					margin: "0 auto",
				}}
			>
				<Typography
					variant={mediaQuerySmMatch ? "h3" : "h2"}
					component="h1"
					mt={2}
					textAlign="center"
				>
					Home
				</Typography>

				{user && user.username && <PostForm />}

				<Box>
					{data.getUsersPosts.map((post) => {
						return <Post post={post} key={post.id} />;
					})}
				</Box>
			</Box>
		</Container>
	);
};

export default Posts;
