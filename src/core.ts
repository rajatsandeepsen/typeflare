import type { Bindings, CF_Bindings } from "./types";
import type { Wrangler } from "./wrangler";

export type TypeFlare<
	W extends CF_Bindings & Wrangler,
	USERLESS = Omit<W, keyof CF_Bindings>,
	WWT = Omit<W, keyof USERLESS>,
	K = keyof WWT,
> = K extends keyof W["typeflare"]
	? Bindings<W["typeflare"]>
	: BindingsError<K>;

type BindingsError<K> = K extends string
	? `ERROR: TypeFlares config is out of sync. Missing [${K}]`
	: "ERROR: TypeFlares config is out of sync. Please match keys with rest of wrangler file.";
