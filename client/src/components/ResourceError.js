import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ResourceError = () => {
	return (
		<Box sx={{ marginTop: "25vh", textAlign: "center" }}>
			<Typography variant="h3" component="h1" mb="0.5rem">
				Something went wrong.
			</Typography>
			<Typography variant="body1">
				The resource you're trying to access cannot be reached.
			</Typography>
		</Box>
	);
};

export default ResourceError;
