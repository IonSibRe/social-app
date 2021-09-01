import React from "react";

const DeactivateModal = ({ modalOpen, setModalOpen, deactivateAcc }) => {
	return (
		<div
			className={`deactivate-modal ${
				modalOpen && "deactivate-modal-open"
			}`}
		>
			<div className="deactivate-modal-content">
				<div className="deactivate-modal-close-btn-wrap">
					<button
						className="deactivate-modal-btn deactivate-modal-close-btn"
						onClick={() => setModalOpen(false)}
					>
						&times;
					</button>
				</div>
				<div className="deactivate-modal-content-inner-wrap">
					<p className="deactivate-modal-text">
						Are you sure you want to deactivate your account?
					</p>
					<button
						className="deactivate-modal-btn deactivate-modal-accept-btn"
						onClick={deactivateAcc}
					>
						Deactivate
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeactivateModal;
