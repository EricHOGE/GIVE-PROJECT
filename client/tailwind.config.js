/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				dark: "rgb(27, 36, 48)",
				light: {
					DEFAULT: "rgb(37, 45, 58)",
					50: "rgb(37, 45, 58, 0.5)",
				},
				primary: "#f97f27",
				secondary: "#310ffa",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
