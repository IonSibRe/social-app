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
