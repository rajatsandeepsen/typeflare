import type { TypeFlare } from "typeflare";
import type Wrangler from "./wrangler.json";

type Bindings = TypeFlare<typeof Wrangler>;

export const env = {} as Bindings;

/**
 * Don't need to .gitignore this file
 * Cloudflare will override the import `cloudflare:workers` with its own anyways
 */

/*
Update your tsconfig.json

{
	"compilerOptions": {
		"paths": {
			"cloudflare:workers": ["./env.ts"]
		}
	}
}
*/
