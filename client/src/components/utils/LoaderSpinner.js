import React from "react";
import loaderSpinner from "../../assets/loader-spinner.gif";

const LoaderSpinner = ({ width = 25 }) => {
	return <img src={loaderSpinner} alt="Loader Spinner" style={{ width }} />;
};

export default LoaderSpinner;
