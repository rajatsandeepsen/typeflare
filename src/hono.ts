import type { TypeFlare } from "./core";
import type { CF_Bindings } from "./types";
import type { Wrangler } from "./wrangler";

type Variables = object;
type Bindings = object;

type Env = {
	Bindings?: Bindings;
	Variables?: Variables;
};

export type TypeFlareHono<
	W extends CF_Bindings & Wrangler,
	V extends Variables = {},
> = {
	Bindings: TypeFlare<W>;
	Variables: V;
};
