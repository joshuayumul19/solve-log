import { border, extendTheme } from "@chakra-ui/react";

const activeLabelStyles = {
	transform: "scale(0.85) translateY(-24px)",
};

const colors = {
	brand: {
		primary: "#38A169",
		accent: "#3182CE",
		background: {
			light: "#F7FAFC",
			dark: "#2D3748",
		},
		text: {
			light: "#2D3748",
			dark: "#F7FAFC",
		},
		highlight: "#E6FFFA",
	},
};

const theme = extendTheme({
	colors,
	config: {
		initialColorMode: "light",
		useSystemColorMode: false,
	},
	styles: {
		global: (props) => ({
			body: {
				bg:
					props.colorMode === "light"
						? "brand.background.light"
						: "brand.background.dark",
				color:
					props.colorMode === "light"
						? "brand.text.light"
						: "brand.text.dark",
			},
		}),
	},
	components: {
		Button: {
			baseStyle: {
				fontWeight: "bold",
				padding: "1.5rem",
				bg: "brand.primary",
				color: "brand.highlight",
				_hover: {
					bg: "brand.accent",
					color: "brand.highlight",
				},
			},
			variants: {
				solid: (props) => ({
					bg: "brand.primary",
					color: "brand.highlight",
					_hover: {
						bg: "brand.accent",
						color: "brand.highlight",
					},
				}),
				ghost: (props) => ({
					bg: "transparent",
					color: "brand.highlight",
					_hover: {
						bg: "brand.primary",
						color: "brand.highlight",
					},
				}),
				outline: (props) => ({
					bg: "transparent",
					color: "brand.primary",
					borderColor: "transparent",
					_hover: {
						bg: "transparent",
						color: "brand.primary",
						borderColor: "brand.primary",
					},
				}),
			},
		},
		Form: {
			variants: {
				floating: (props) => ({
					container: {
						_focusWithin: {
							label: {
								...activeLabelStyles,
							},
						},
						"input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
							{
								...activeLabelStyles,
							},
						label: {
							top: 0,
							left: 0,
							zIndex: 9999,
							position: "absolute",
							backgroundColor:
								props.colorMode === "light"
									? "white"
									: "brand.background.dark",
							pointerEvents: "none",
							mx: 3,
							px: 1,
							my: 2,
							transformOrigin: "left top",
						},
						input: {
							borderColor: "gray.400",
							_hover: {
								borderColor: "brand.primary",
							},
						},
					},
				}),
			},
		},
	},
});

export default theme;
