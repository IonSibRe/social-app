import React, { useContext, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import { UserContext } from "../context/UserContext";
import DeactivateModal from "../components/DeactivateModal";
import ProfileChangePw from "../components/ProfileChangePw";
import ProfileFilter from "../components/ProfileFilter";
import ProfileInfo from "../components/ProfileInfo";

import { Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

const Profile = () => {
	const { user, logout } = useContext(UserContext);
	const [modalOpen, setModalOpen] = useState(false);

	const theme = useTheme();
	const mediaQueryMdMatch = useMediaQuery(theme.breakpoints.down("md"));

	const [deactivateAccount] = useMutation(DEACTIVATE_ACCOUNT, {
		onCompleted: (data) => {
			console.log(data);
			logout();
		},
		variables: { userId: user.id },
	});

	if (window.location.pathname === "/profile") {
		return <Redirect to="/profile/info" />;
	}

	return (
		<Container
			maxWidth="lg"
			sx={{
				display: "flex",
				flexDirection: mediaQueryMdMatch ? "column" : "row",
				justifyContent: "space-between",
				marginTop: "3rem",
			}}
		>
			<ProfileFilter setModalOpen={setModalOpen} />
			{modalOpen && (
				<DeactivateModal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					deactivateAccount={deactivateAccount}
				/>
			)}
			<Route path="/profile/info" component={ProfileInfo} />
			<Route
				path="/profile/password-change"
				component={ProfileChangePw}
			/>
		</Container>
	);
};

const DEACTIVATE_ACCOUNT = gql`
	mutation deactivateAccount($userId: ID!) {
		deactivateAccount(userId: $userId) {
			id
			username
		}
	}
`;

export default Profile;
