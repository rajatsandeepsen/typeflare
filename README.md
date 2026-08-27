<a href="https://github.com/rajatsandeepsen/typeflare">
    <img alt="cover" src="https://github.com/rajatsandeepsen/typeflare/blob/main/cover.png?raw=true" />
</a>

# TypeFlare = CloudFlare + TypeScript

Infer TypeScript Cloudflare Worker bindings directly from `wrangler.json` file.

Instead of managing 14K+ lines of generated typescript file, just install `typeflare`.

No need to run `npx wrangler types` periodically or update global `types.d.ts` every time you change configuration.

- No CLI ✗
- No extra files ✗
- No build time checks ✗
- No runtime checks ✗

- Single source of truth ✓
- Strong type checking ✓
- Just 3 lines of code ✓

Set up once, Enjoy Cloudflare Worker bindings forever.

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
	"name": "my-worker",
	"main": "./server.ts",

	"vars": {
		"NODE_ENV": "production",
		"BUN_VERSION": "1.2.15",
		"EXAMPLE_FLAG": "true"
	},

	"env": {
		"development": {
			"vars": {
				"DEV": 1
			}
		}
	},

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
import { Response, type TypeFlareHandler } from "typeflare";
import type Wrangler from "./wrangler.json";

export default {
	async fetch(request, env) {
		const { results } = await env.DATABASE.prepare("SELECT * FROM Customers").run();
		return Response.json(results);
	},
} satisfies TypeFlareHandler<typeof Wrangler>;
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
import type { GetEnv } from "typeflare";

type Env = GetEnv<typeof Wrangler>

export const env = {} as Env;
// or 
export declare const env: Env;
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

No matter what's your `tsconfig` configurations, Cloudflare will override the import `cloudflare:workers` with its own.

If you want more Cloudflare export, write this inside `env.ts`.

```ts
import type Wrangler from "./wrangler.json";
import type { GetDefaultExport } from "typeflare";

type Exports = GetDefaultExport<typeof Wrangler>;

export const { env, waitUntil, withEnv } = {} as Exports;
// or
export declare const { env, waitUntil, withEnv }: Exports;
```

## Extending process.env with vars

Create a file called `global.d.ts` on your project root folder and write this code

```ts
import type Wrangler from "./wrangler.json";
import type { GetVars } from "typeflare";

type Vars = GetVars<typeof Wrangler>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Vars {
			// ADDITIONAL_ENV: string
		}
	}
}
```

Now add this file path in your `tsconfig.json` file to extend your `process.env` with wrangler vars.

```jsonc
{
	"compilerOptions": {},
	"include": [
		"./**/*.ts",
		
		// to extend types globally
		"./global.d.ts",
	]
}		
```

Usage

```ts
console.log(process.env.BUN_VERSION)
console.log(process.env.EXAMPLE_FLAG)
console.log(process.env.DEV)
```

## Features

- [x] Check missing bindings
- [x] Omit bindings from config file
- [x] Check duplicate binding names
- [x] Extends `process.env` with wrangler vars
- [ ] Import `.jsonc` file

## Issue

TypeScript doesn't support `.jsonc` or `.toml` imports.

So renamed & convert your `wrangler.jsonc` or `wrangler.toml` files to `wrangler.json`.

## Documentation

Please check out the [Cloudflare bindings docs](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and [Hono docs](https://hono.dev/docs/getting-started/cloudflare-workers) for more information.
