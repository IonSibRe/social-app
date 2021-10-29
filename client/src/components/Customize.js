import React, { useState } from "react";
import {
	Box,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";

const Customize = () => {
	const [themeMode, setThemeMode] = useState(
		JSON.parse(localStorage.getItem("themeMode"))
	);
	const handleChange = (e) => {
		setThemeMode(e.target.value);
		localStorage.setItem("themeMode", JSON.stringify(e.target.value));

		setTimeout(() => {
			window.location.reload();
		}, [500]);
	};

	return (
		<Box sx={{ flex: "3" }}>
			<Typography variant="h4" component="h2" mb="1rem">
				Account Information
			</Typography>
			<FormControl component="fieldset">
				<FormLabel component="legend">Theme</FormLabel>
				<RadioGroup
					defaultValue="light"
					value={themeMode}
					onChange={handleChange}
				>
					<FormControlLabel
						value="light"
						label="Light"
						control={<Radio />}
					/>
					<FormControlLabel
						value="dark"
						label="Dark"
						control={<Radio />}
					/>
				</RadioGroup>
			</FormControl>
		</Box>
	);
};

export default Customize;
