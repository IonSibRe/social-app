import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { UserContext } from "../context/UserContext";
import ProfileAdditionalInfo from "./ProfileAdditionalInfo";
import ProfileUserInfo from "./ProfileUserInfo";
import { GET_USER_INFO_BY_USERNAME } from "../utils/graphql";
import { updateUserDataAfterFetch } from "../utils/utilities";
import LoaderSpinner from "./utils/LoaderSpinner";
import { Box, Typography } from "@mui/material";

const ProfileInfo = () => {
	const { user, setUserPublicData } = useContext(UserContext);
	const [userLocalAdditionalData, setUserLocalAdditionalData] = useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		country: "",
		birthDate: "",
		profession: "",
		company: "",
	});

	const [getUserInfoByUsername, { loading }] = useLazyQuery(
		GET_USER_INFO_BY_USERNAME,
		{
			onCompleted: (data) => {
				updateUserDataAfterFetch(
					data,
					setUserPublicData,
					setUserLocalAdditionalData
				);
			},
			onError: (err) => console.log(err),
			fetchPolicy: "cache-and-network",
		}
	);

	useEffect(() => {
		getUserInfoByUsername({ variables: { username: user.username } });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) {
		return (
			<div className="profile-info">
				<div className="loader-wrap">
					<LoaderSpinner width={150} />
				</div>
			</div>
		);
	}

	return (
		<Box sx={{ flex: "3" }}>
			<Typography variant="h4" component="h2">
				Account Information
			</Typography>

			<ProfileUserInfo />
			<ProfileAdditionalInfo
				userLocalAdditionalData={userLocalAdditionalData}
				setUserLocalAdditionalData={setUserLocalAdditionalData}
			/>
		</Box>
	);
};

export default ProfileInfo;
