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
			banner
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
			id
			username
			description
			profileImg
			banner
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
