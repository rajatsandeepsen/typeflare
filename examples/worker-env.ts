import type { GetDefaultExport } from "typeflare";
import type Wrangler from "./wrangler.json";

type Exports = GetDefaultExport<typeof Wrangler>;

export const { env, waitUntil, withEnv } = {} as Exports;

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
