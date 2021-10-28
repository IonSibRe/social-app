import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
	query getAllPosts {
		getAllPosts {
			id
			username
			body
			img
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

export const GET_USERS_POSTS = gql`
	query getUsersPosts {
		getUsersPosts {
			id
			username
			body
			img
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

export const UPLOAD_IMAGE = gql`
	mutation uploadImage(
		$base64File: String!
		$imgType: String!
		$deletePublicId: ID
	) {
		uploadImage(
			base64File: $base64File
			imgType: $imgType
			deletePublicId: $deletePublicId
		) {
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
