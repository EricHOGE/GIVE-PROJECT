import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		env: {
			IS_REACT_ACT_ENVIRONMENT: "true",
		},
		include: ["__tests__/**/*.[jt]s?(x)"],
	},
});
