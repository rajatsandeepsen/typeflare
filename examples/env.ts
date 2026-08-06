import type { TypeFlare } from "typeflare";
import type Wrangler from "./wrangler.json";

type Bindings = TypeFlare<typeof Wrangler>;

export const env = {} as Bindings;

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
