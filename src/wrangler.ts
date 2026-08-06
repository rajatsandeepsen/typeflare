import type { TypeFlareBindings } from "./types";

export type Wrangler = {
	vars?: Record<string, string>;
	typeflare: TypeFlareBindings;
};
