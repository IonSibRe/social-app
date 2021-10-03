import React, { useContext } from "react";
import { Redirect } from "react-router";

import { UserContext } from "../context/UserContext";
import Posts from "../components/Posts";

const Home = () => {
	const { loggedIn } = useContext(UserContext);

	if (!loggedIn) return <Redirect to="/login" />;

	return <Posts />;
};

export default Home;
