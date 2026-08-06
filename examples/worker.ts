import { type ExportedHandler, Response } from "@cloudflare/workers-types";
import type { TypeFlare } from "typeflare";
import type Wrangler from "./wrangler.json";

type Bindings = TypeFlare<typeof Wrangler>;

export default {
	async fetch(request, env) {
		const { results } = await env.DATABASE.prepare(
			"SELECT * FROM Customers",
		).run();
		return Response.json(results);
	},
} satisfies ExportedHandler<Bindings>;
