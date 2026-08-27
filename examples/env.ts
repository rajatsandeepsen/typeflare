import type { GetEnv } from "typeflare";
import type Wrangler from "./wrangler.json";

export declare const env: GetEnv<typeof Wrangler>;
// or
// export const env = {} as GetEnv<typeof Wrangler>;

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
