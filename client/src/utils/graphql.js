import { gql } from "@apollo/client";

export const GET_POSTS = gql`
	query getPosts {
		getPosts {
			id
			username
			body
			commentCount
			likeCount
			comments {
				id
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

export const GET_USER_INFO_BY_USERNAME = gql`
	query getUserInfoByUsername($username: String!) {
		getUserInfoByUsername(username: $username) {
			username
			description
			profileImg
			followers
			following
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
