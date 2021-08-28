import moment from "moment";

const formatMsFromEpochToFromNow = (time) => {
	return moment(new Date(parseInt(time))).fromNow();
};

export { formatMsFromEpochToFromNow };
