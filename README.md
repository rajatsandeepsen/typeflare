<a href="https://github.com/rajatsandeepsen/typeflare">
    <img alt="cover" src="https://github.com/rajatsandeepsen/typeflare/blob/main/cover.png?raw=true" />
</a>

# TypeFlare - Cloudflare Bindings

Infer TypeScript Cloudflare bindings from `wrangler.json` file.

## Setup

You can install the package using npm, bun, nubs or pnpm

```bash
npm i typeflare
```

## Generic Instance

You can import the default type generic instance `TypeFlare` from `typeflare`:

```ts
import { TypeFlare } from "typeflare";
```

Create `wrangler.json` file with necessary BINDINGS and Variables

```jsonc
{
	"$schema": "typeflare/schema.json",
	"name": "test",
	"main": "./server.ts",

	"d1_databases": [
		{
			"binding": "DATABASE",
			"database_name": "<d1-database-name>",
			"database_id": "<d1-database-id>",
		}
	],

	// very important step
	"typeflare": {
		"d1_databases": {
			"DATABASE": true
		},
	}
}
```

## Cloudflare Workers

```ts
import type { TypeFlare } from "typeflare";
import { type ExportedHandler, Response } from "@cloudflare/workers-types";
import type Wrangler from "./wrangler.json";

type Bindings = TypeFlare<typeof Wrangler>

export default {
	async fetch(request, env) {
		const { results } = await env.DATABASE.prepare("SELECT * FROM Customers").run();
		return Response.json(results)
	}
} satisfies ExportedHandler<Bindings>;
```

## Hono

```ts
import { Hono } from "hono";
import type { TypeFlare } from "typeflare/hono";
import type Wrangler from "./wrangler.json";

type Honotype = TypeFlare<typeof Wrangler>
const app = new Hono<Honotype>();

app.get("/", async (c) => {
	const { results } = await c.env.DATABASE.prepare("SELECT * FROM Customers").run();
	return c.json(results)
});

export default app;
```

## Coming Soon

- [x] Hono
- [ ] Elysia
- [ ] Nitro

## Documentation

Please check out the [Cloudflare bindings docs](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and [Hono docs](https://hono.dev/docs/getting-started/cloudflare-workers) for more information.
