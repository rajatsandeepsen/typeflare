import { env } from "cloudflare:workers";
import { Elysia } from "elysia";
import { CloudflareAdapter } from "elysia/adapter/cloudflare-worker";

const app = new Elysia({
	adapter: CloudflareAdapter,
})
	.get("/", async () => {
		const { results } = await env.DATABASE.prepare(
			"SELECT * FROM Customers",
		).run();
		return results;
	})
	.compile();

export default app;
