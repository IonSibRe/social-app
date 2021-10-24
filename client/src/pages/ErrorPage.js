import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import { Button, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

const ErrorPage = () => {
	return (
		<Container
			maxWidth="lg"
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
				<Typography
					variant="h3"
					component="h2"
					sx={{ marginBottom: "0.5rem" }}
				>
					Page Not Found
				</Typography>
				<Typography
					variant="h5"
					component="p"
					sx={{ marginBottom: "1rem" }}
				>
					The page you are looking for might have been removed, had
					it's name changed or is temporarily unavailable.
				</Typography>
				<Link to="/" component={RouterLink}>
					<Button variant="contained" size="large">
						Homepage
					</Button>
				</Link>
			</Box>
		</Container>
	);
};

export default ErrorPage;
