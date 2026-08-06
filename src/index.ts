import type { CF_Bindings_Convertor } from "./types";
import type { Wrangler } from "./wrangler";

export type TypeFlare<W extends Wrangler> = CF_Bindings_Convertor<
	W["typeflare"]
>;
