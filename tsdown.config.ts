import { defineConfig } from "tsdown";

export default defineConfig([
	{
		entry: ["src/index.ts", "src/hono.ts"],
		format: ["cjs", "esm"],
		dts: {
			sourcemap: false,
		},
	},
]);
