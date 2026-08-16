import type { TypeFlare } from "typeflare";
import type { CF_Bindings } from "./types";
import type { Get, HasKey } from "./utils";
import type { Wrangler } from "./wrangler";

type waitUntil = (promise: Promise<unknown>) => void;
type withEnv<E> = (
	newEnv: E extends object ? Partial<Record<keyof E, unknown>> : unknown,
	fn: () => unknown,
) => unknown;

export type GetEnv<W extends CF_Bindings & Wrangler> = TypeFlare<W>;

export type GetVars<
	W extends Wrangler,
	isV = HasKey<W, "vars">,
	isE = HasKey<W, "env">,
	EMPTY = Record<string, unknown>,
> = (isV extends true ? W["vars"] : EMPTY) &
	(isE extends true ? Partial<Get<W["env"], "vars">> : EMPTY);

export type GetDefaultExport<
	W extends CF_Bindings & Wrangler,
	E = GetEnv<W>,
> = {
	env: E;
	waitUntil: waitUntil;
	withEnv: withEnv<E>;
};
