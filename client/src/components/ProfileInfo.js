import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { UserContext } from "../context/UserContext";
import ProfileAdditionalInfo from "./ProfileAdditionalInfo";
import ProfileUserInfo from "./ProfileUserInfo";
import { GET_USER_INFO_BY_USERNAME } from "../utils/graphql";
import { updateUserDataAfterFetch } from "../utils/utilities";
import LoaderSpinner from "./utils/LoaderSpinner";

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
		<div className="profile-info">
			<div className="profile-info-header">
				<h2 className="profile-info-header-text">
					Account Information
				</h2>
			</div>

			<ProfileUserInfo />
			<ProfileAdditionalInfo
				userLocalAdditionalData={userLocalAdditionalData}
				setUserLocalAdditionalData={setUserLocalAdditionalData}
			/>
		</div>
	);
};

export default ProfileInfo;
