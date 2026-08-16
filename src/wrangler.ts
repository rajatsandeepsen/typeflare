import type { TypeFlareBindings } from "./types";

export type JsonKeys = string | number | boolean | null;
export type Json =
	| JsonKeys
	| Record<string, JsonKeys | Array<Json>>
	| Array<Json>;

export type Wrangler = {
	vars?: Json;
	env?: Record<
		string,
		{
			vars?: Json;
		}
	>;
	typeflare: TypeFlareBindings;
};
