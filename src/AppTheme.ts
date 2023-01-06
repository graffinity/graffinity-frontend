import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { createTheme } from "@mui/material";

const AppTheme = createTheme({
	components: {
		MuiAlert: {
			styleOverrides: {
				root: {
					color: "#FFFFFF !important",
					borderRadius: "0px",
				},
				icon: {
					color: "#FFFFFF !important",
				},
				message: {
					width: "100%",
				},
			},
			variants: [
				{
					props: { severity: "success" },
					style: {
						background: "#388E3C",
					},
				},
				{
					props: { severity: "error" },
					style: {
						background: "#D32F2F",
					},
				},
				{
					props: { severity: "warning" },
					style: {
						background: "#FFC107",
					},
				},
				{
					props: { severity: "info" },
					style: {
						background: "#7A8BC7",
					},
				},
			],
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					color: "#E5E5E5 !important",
					"&.MuiOutlinedInput-input": {
						padding: "13.5px 16px",
						height: "21px",
					},
					"& 	.Mui-focused": {
						border: "2px solid #d9d9d9 !important",
					},
					root: {
						"&.MuiOutlinedInput-root": {
							color: "#ddd8",
							"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
								border: "2px solid #d9d9d9 !important",
							},

							"& fieldset": {
								border: "none",
							},
						},
						"& .MuiOutlinedInput-root .Mui-focused": {
							"& .MuiOutlinedInput-notchedOutline": {

								border: "2px solid #d9d9d9 !important",
							}
						},
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
				},
				notchedOutline: {
					border: "1px solid #fff7",
				},
			},
		},

		MuiTextField: {
			styleOverrides: {
				root: {
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: "#FFFFFF",
					},
					
				},
			},
		},
		MuiAutocomplete: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						"& .MuiAutocomplete-input": {
							padding: "4.5px 4px 4.5px 6px",
						},
					},
				},
			},
		},
	},
	typography: {
		fontFamily: "Inter",
		fontWeightRegular: "400",
		fontWeightMedium: "500",
		fontWeightBold: "600",
		h1: {
			fontSize: "36px",
			lineHeight: "140%",
			fontWeight: "700",
			color: "#181D2B",
		},
		h2: {
			fontSize: "28px",
			lineHeight: "140%",
			fontWeight: "700",
			color: "#181D2B",
		},
		h3: {
			fontSize: "24px",
			lineHeight: "140%",
			fontWeight: "700",
			color: "#181D2B",
		},
		h5: {
			fontSize: "15px",
			lineHeight: "140%",
			fontWeight: "500",
			color: "#181D2B",
		},
		h6: {
			fontSize: "13px",
			lineHeight: "140%",
			fontWeight: "500",
			color: "#181D2B",
		},
		body: {
			fontSize: "16px",
			lineHeight: "140%",
			fontWeight: "400",
			color: "#181D2B",
		},
		body2: {
			fontSize: "14px",
			lineHeight: "140%",
			fontWeight: "400",
			color: "#181D2B",
		},
		subtitle: {
			fontSize: "12px",
			lineHeight: "140%",
			fontWeight: "400",
			color: "#181D2B",
		},
		hyperlink: {
			fontSize: "16px",
			lineHeight: "140%",
			fontWeight: "400",
			color: "#4A5E96",
			textDecorationLine: "underline",
		},
	},
	palette: {
		primary: {
			main: "#4A5E96",
			light: "#7A8BC7",
			dark: "#183568",
			extraLight: "#7A8BC7",
		},
		text: {
			secondary: "rgba(23, 20, 64, 0.6)",
			light: "#F8F8F8",
			disabled: "rgba(24, 29, 43, 0.6)",
		},
		background: {
			default: "#FFFFFF",
			light: " #F9FBFB",
		},
		error: {
			main: "#E53935",
		},
		warning: {
			main: "#FFC107",
			contrastText: "#3A3500",
		},
		red: {
			50: "#FEEBEE",
			100: "#FECDD2",
			200: "#EF9A9A",
			300: "#E57373",
			400: "#EF5350",
			500: "#F44336",
			600: "#E53935",
			700: "#D32F2F",
			800: "#C62828",
			900: "#B71C1C",
		},
	},
});

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		hyperlink: true;
		overline: false;
		body: true;
		body1: false;
		subtitle: true;
		subtitle1: false;
	}
}

declare module "@mui/material/styles" {
	interface TypographyVariants {
		hyperlink: React.CSSProperties;
		body: React.CSSProperties;
		subtitle: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		hyperlink?: React.CSSProperties;
		body?: React.CSSProperties;
		subtitle?: React.CSSProperties;
	}
}
declare module "@mui/material/styles/createPalette" {
	interface Palette {
		specific: Palette["primary"];
		neutral: Palette["primary"];
		error: Palette["primary"];
		red: Palette["grey"];
		green: Palette["grey"];
	}

	interface PaletteOptions {
		specific?: PaletteOptions["primary"];
		neutral?: PaletteOptions["primary"];
		error?: PaletteOptions["primary"];
		red?: PaletteOptions["grey"];
		green?: PaletteOptions["grey"];
	}

	interface TypeText {
		light: string;
	}

	interface TypeTextOptions {
		light?: PaletteOptions["primary"];
	}

	interface PaletteColor {
		extraLight?: string;
	}

	interface SimplePaletteColorOptions {
		extraLight?: string;
	}

	interface TypeBackground {
		light: string;
	}

	interface SimplePaletteColorOptions {
		light?: string;
	}
}

export default AppTheme;
