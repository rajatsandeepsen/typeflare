import { Hono } from "hono";
import type { TypeFlareHono } from "typeflare";
import type Wrangler from "./wrangler.json";

type HonoType = TypeFlareHono<typeof Wrangler>;

const app = new Hono<HonoType>();

app.get("/", async (c) => {
	const { results } = await c.env.DATABASE.prepare(
		"SELECT * FROM Customers",
	).run();
	return c.json(results);
});

export default app;
