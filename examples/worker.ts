import { Response, type TypeFlareHandler } from "typeflare";
import type Wrangler from "./wrangler.json";

export default {
	async fetch(request, env) {
		const { results } = await env.DATABASE.prepare("SELECT * FROM Customers").run();
		return Response.json(results);
	},
} satisfies TypeFlareHandler<typeof Wrangler>;
