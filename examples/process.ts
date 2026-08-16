import type { TypeFlare } from "typeflare";
import type { Equals } from "../src/utils";
import type Wrangler from "./wrangler.json";

type Bindings = TypeFlare<typeof Wrangler>;

process.env.EXAMPLE_FLAG;
process.env.DEV;

const x: Equals<typeof process.env.EXAMPLE_FLAG, string> = true;
const y: Equals<typeof process.env.DEV, number | undefined> = true;
const z: Equals<typeof process.env.BUN_VERSION, string> = true;
