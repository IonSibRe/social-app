import React from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

const ErrorPage = () => {
	return (
		<Container
			maxWidth="sm"
			sx={{
				display: "flex",
				justifyContent: "center",
				marginTop: "10vh",
			}}
		>
			<Box
				sx={{
					textAlign: "center",
				}}
			>
				<Typography variant="h1">404</Typography>
				<Typography variant="h2" sx={{ marginBottom: "0.5rem" }}>
					Page Not Found
				</Typography>
				<Typography
					variant="body1"
					fontSize="2rem"
					sx={{ marginBottom: "1rem" }}
				>
					The page you are looking for might have been removed, had
					it's name changed or is temporarily unavailable.
				</Typography>
				<Link to="/">
					<Button
						variant="contained"
						size="medium"
						sx={{ fontSize: "1.5rem" }}
					>
						Homepage
					</Button>
				</Link>
			</Box>
		</Container>
	);
};

export default ErrorPage;
