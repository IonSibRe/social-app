import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import { gql, useMutation, useQuery } from "@apollo/client";

import { UserContext } from "../../context/UserContext";
import { GET_USER_INFO_BY_USERNAME } from "../../utils/graphql";
import { Button } from "@mui/material";

const FollowButton = ({ userToFollow }) => {
	const { username } = useParams();
	const { user, setUserPublicData } = useContext(UserContext);
	const [following, setFollowing] = useState(false);

	const { data } = useQuery(GET_USER_INFO_BY_USERNAME, {
		onCompleted: () =>
			setFollowing(
				data.getUserInfoByUsername.following.includes(username)
			),
		variables: {
			username: user.username,
		},
	});

	const [followUser] = useMutation(FOLLOW_USER, {
		onCompleted: (data) => {
			setUserPublicData(data.followUser);
			const following = data.followUser.following.find(
				(following) => following === userToFollow
			);
			setFollowing(following);
		},
		onError: (err) => console.log(err),
		variables: {
			currentUser: user.username,
			userToFollow,
		},
	});

	const handleSubmit = () => {
		followUser();
	};

	return (
		<Button
			onClick={handleSubmit}
			variant="contained"
			color={following ? "danger" : "primary"}
		>
			{following ? "Unfollow" : "Follow"}
		</Button>
	);
};

const FOLLOW_USER = gql`
	mutation followUser($currentUser: String!, $userToFollow: String!) {
		followUser(currentUser: $currentUser, userToFollow: $userToFollow) {
			username
			description
			profileImg
			banner
			followers
			followersCount
			following
			followingCount
			createdAt
			userAdditionalInfo {
				firstName
				lastName
				phoneNumber
				country
				birthDate
				profession
				company
			}
		}
	}
`;

export default FollowButton;
