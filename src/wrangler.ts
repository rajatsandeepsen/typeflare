import type { TypeFlareBindings } from "./types";

type Json = string | number | boolean | null | Array<Json>;

export type Wrangler = {
	vars?: Json | Record<string, Json>;
	typeflare: TypeFlareBindings;
};
