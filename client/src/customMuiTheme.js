import { blue, grey, indigo, pink, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const localStorageThemeMode = JSON.parse(localStorage.getItem("themeMode"));

let themeMode = localStorageThemeMode
	? localStorageThemeMode
	: localStorage.setItem("themeMode", JSON.stringify("light"));

const getPalette = (themeMode = "light") => {
	return themeMode === "light"
		? {
				mode: "light",
				primary: {
					main: blue["600"],
				},
				secondary: {
					main: pink["A400"],
				},
				danger: {
					main: red["A700"],
				},
		  }
		: {
				mode: "dark",
				primary: {
					main: blue["600"],
				},
				secondary: {
					main: pink["A400"],
				},
				danger: {
					main: red["A700"],
				},
				background: {
					default: grey["900"],
					paper: indigo["900"],
				},
		  };
};

const theme = createTheme({
	palette: {
		...getPalette(themeMode),
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
