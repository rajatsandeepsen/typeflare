import type { CF_Bindings, CF_Bindings_Convertor } from "./types";
import type { Wrangler } from "./wrangler";

type Variables = object;
type Bindings = object;

type Env = {
	Bindings?: Bindings;
	Variables?: Variables;
};

type GenerateEnv<E extends CF_Bindings, V extends Variables> = {
	Bindings: CF_Bindings_Convertor<E>;
	Variables: V;
};

export type TypeFlareHono<
	W extends Wrangler,
	V extends Variables = {},
> = GenerateEnv<W["typeflare"], W["vars"] & V>;
