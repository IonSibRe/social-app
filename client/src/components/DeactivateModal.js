import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DeactivateModal = ({ modalOpen, setModalOpen, deactivateAccount }) => {
	return (
		<Modal
			sx={{
				display: "flex",
				justifyContent: "center",
			}}
			open={modalOpen}
			onClose={() => setModalOpen(false)}
		>
			<Box
				sx={{
					height: "fit-content",
					width: "250px",
					marginTop: "25vh",
					padding: "1rem",
					borderRadius: "5px",
					backgroundColor: "#fff",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "10px",
					}}
				>
					<Typography variant="h5" component="h3" color="#000">
						Deactivate
					</Typography>
					<IconButton
						size="small"
						color="danger"
						onClick={() => setModalOpen(false)}
					>
						<CloseIcon />
					</IconButton>
				</Box>
				<Box sx={{ textAlign: "center" }}>
					<Typography mb="10px" color="#000">
						Are you sure you want to deactivate your account?
					</Typography>
					<Button
						onClick={deactivateAccount}
						variant="outlined"
						color="danger"
					>
						Deactivate
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default DeactivateModal;
