import { createTheme } from "@mui/material/styles";

const mode = "dark";

const getPalette = (mode) => {
	return mode === "light"
		? {
				mode: "light",
				primary: {
					main: "#1e88e5",
				},
				secondary: {
					main: "#f50057",
				},
		  }
		: {
				mode: "dark",
				primary: {
					main: "#1e88e5",
				},
				secondary: {
					main: "#f50057",
				},
				background: {
					default: "#0A1929",
					paper: "#192734",
				},
		  };
};

const theme = createTheme({
	palette: {
		...getPalette(mode),
		breakpoints: {
			values: {
				xs: 0,
				sm: 425,
				md: 768,
				lg: 1200,
				xl: 1536,
			},
		},
	},
});

export default theme;
