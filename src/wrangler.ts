import type { CF_Bindings } from "./types";

export type Wrangler = {
	vars: Record<string, string>;
	typeflare: CF_Bindings;
};
