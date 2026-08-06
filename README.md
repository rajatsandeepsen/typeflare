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
			"database_id": "<d1-database-id>"
		}
	],

	// very important step
	"typeflare": {
		"d1_databases": {
			"DATABASE": true
		}
	}
}
```

Then You can import the default type generic instance `TypeFlare` from `typeflare`:

```ts
import { TypeFlare } from "typeflare";
```

## Cloudflare Workers

```ts
import type { TypeFlare } from "typeflare";
import { type ExportedHandler, Response } from "@cloudflare/workers-types";
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
```

## Hono

```ts
import { Hono } from "hono";
import type { TypeFlareHono } from "typeflare";
import type Wrangler from "./wrangler.json";

type Honotype = TypeFlareHono<typeof Wrangler>;
const app = new Hono<Honotype>();

app.get("/", async (c) => {
	const { results } = await c.env.DATABASE.prepare(
		"SELECT * FROM Customers",
	).run();
	return c.json(results);
});

export default app;
```

## TypeScript Requirement

Make sure to enable `resolveJsonModule` in your `tsconfig.json` file.

```jsonc
{
	"compilerOptions": {
		"resolveJsonModule": true
	}
}
```

## Cloudflare Bindings, Global Import (Advanced)

Create a file called `env.ts` and write this code

```ts
import type Wrangler from "./wrangler.json";
import type { TypeFlare } from "typeflare";

type Bindings = TypeFlare<typeof Wrangler>;

export const env = {} as Bindings;
```

Now add this path in your `tsconfig.json` file to fool you local TypeScript linter

```jsonc
{
	"compilerOptions": {
		"paths": {
			// fool the linter
			"cloudflare:workers": ["./env.ts"]
		}
	}
}
```

Now import Cloudflare bindings as global `env`.

```ts
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
```

## Work in Progress

- [x] Hono
- [x] Elysia
- [ ] Nitro

## Issue

TypeScript doesn't support `.jsonc` or `.toml` imports.

So renamed your `wrangler.jsonc` or `wrangler.toml` files to `wrangler.json`.

Or convert to `.json` on build time.

## Documentation

Please check out the [Cloudflare bindings docs](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and [Hono docs](https://hono.dev/docs/getting-started/cloudflare-workers) for more information.
