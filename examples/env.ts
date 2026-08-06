import type { TypeFlare } from "typeflare";
import type Wrangler from "./wrangler.json";

type Bindings = TypeFlare<typeof Wrangler>;

export const env = {} as Bindings;
