<a href="https://github.com/rajatsandeepsen/typeflare">
    <img alt="cover" src="https://github.com/rajatsandeepsen/typeflare/blob/main/cover.png?raw=true" />
</a>

# TypeFlare = CloudFlare + TypeScript

Infer TypeScript Cloudflare Worker bindings directly from `wrangler.json` file.

No need to run `npx wrangler types` periodically or update global `types.d.ts` every time you change configuration.

- No CLI ✗
- No extra files ✗
- No build time checks ✗
- No runtime checks ✗
- Single source of truth ✓
- Strong type checking ✓
- Just 3 lines of code ✓

Set up once, Enjoy Cloudflare Worker binding forever.

## Setup

You can install the package using npm, bun, nubs or pnpm

```bash
npm i typeflare
```

Create `wrangler.json` file with necessary BINDINGS and Variables

```jsonc
{
	// to get type suggestions while updating bindings
	"$schema": "node_modules/typeflare/schema.json",
	"name": "test",
	"main": "./server.ts",

	"d1_databases": [
		{
			"binding": "DATABASE",
			"database_name": "<d1-database-name>",
			"database_id": "<d1-database-id>"
		},
		{
			"binding": "ANOTHER_DATABASE",
			"database_name": "<d1-database-name>",
			"database_id": "<d1-database-id>"
		}
	],

	// very important step
	"typeflare": {
		"d1_databases": {
			"DATABASE": true,
			"ANOTHER_DATABASE": null // to omit
		}
	}
}
```

Then You can import the default generic type instance `TypeFlare` from `typeflare`:

```ts
import { TypeFlare } from "typeflare";

import type Wrangler from "./wrangler.json";

type Bindings = TypeFlare<typeof Wrangler>;
```

That's it, just three lines of extra code.

## Cloudflare Workers

```ts
import type { TypeFlare } from "typeflare";
import { type ExportedHandler, Response } from "@cloudflare/workers-types";
import type Wrangler from "./wrangler.json";

type Bindings = TypeFlare<typeof Wrangler>;

export default {
	async fetch(request, env) {
		const { results } = await env.DATABASE.prepare("SELECT * FROM Customers").run();
		return Response.json(results);
	},
} satisfies ExportedHandler<Bindings>;
```

## Hono

```ts
import { Hono } from "hono";
import type { TypeFlareHono } from "typeflare";
import type Wrangler from "./wrangler.json";

type HonoType = TypeFlareHono<typeof Wrangler>;
const app = new Hono<HonoType>();

app.get("/", async (c) => {
	const { results } = await c.env.DATABASE.prepare("SELECT * FROM Customers").run();
	return c.json(results);
});

export default app;
```

## TypeScript Requirement

Make sure to enable `resolveJsonModule` in your `tsconfig.json` file.

```jsonc
{
	"compilerOptions": {
		// to enable .json file import
		"resolveJsonModule": true
	}
}
```

## Cloudflare Bindings, Global Import

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

export default new Elysia({ adapter: CloudflareAdapter })
	.get("/", async () => {
		const { results } = await env.DATABASE.prepare("SELECT * FROM Customers").run();
		return results;
	})
	.compile();
```

## Features

- [x] Check missing bindings
- [x] Omit bindings from config file
- [x] Check duplicate binding names
- [ ] Import `.jsonc` file

## Issue

TypeScript doesn't support `.jsonc` or `.toml` imports.

So renamed your `wrangler.jsonc` or `wrangler.toml` files to `wrangler.json`.

Or convert to `.json` on build time.

## Documentation

Please check out the [Cloudflare bindings docs](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and [Hono docs](https://hono.dev/docs/getting-started/cloudflare-workers) for more information.
