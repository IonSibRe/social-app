import moment from "moment";

const formatMsFromEpochToFromNow = (time) => {
	return moment(new Date(parseInt(time))).fromNow();
};

const removeTypename = (gqlResponseData) => {
	return Object.fromEntries(
		Object.entries(gqlResponseData).filter(([key]) => key !== "__typename")
	);
};

const updateUserDataAfterFetch = (
	data,
	setUserPublicData,
	setUserLocalAdditionalData
) => {
	const objKey = Object.keys(data)[0];
	const publicData = data[objKey];

	setUserPublicData(publicData);
	setUserLocalAdditionalData(removeTypename(publicData.userAdditionalInfo));
};

export { formatMsFromEpochToFromNow, removeTypename, updateUserDataAfterFetch };
