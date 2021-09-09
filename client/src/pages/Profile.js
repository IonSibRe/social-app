import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import DeactivateModal from "../components/DeactivateModal";
import ProfileChangePw from "../components/ProfileChangePw";
import ProfileFilter from "../components/ProfileFilter";
import ProfileInfo from "../components/ProfileInfo";

const Profile = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const deactivateAcc = () => {
		console.log("deactivate");
	};

	return (
		<section className="profile-section section-center">
			<ProfileFilter setModalOpen={setModalOpen} />
			{modalOpen && (
				<DeactivateModal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					deactivateAcc={deactivateAcc}
				/>
			)}
			<Route path="/profile/info" component={ProfileInfo} />
			<Route
				path="/profile/password-change"
				component={ProfileChangePw}
			/>
			<Redirect to="/profile/info" />
		</section>
	);
};

export default Profile;