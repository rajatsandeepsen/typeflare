import type { GetVars } from "typeflare";
import type Wrangler from "./wrangler.json";

type Env = GetVars<typeof Wrangler>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Env {
			// ADDITIONAL_ENV: string
		}
	}
}
