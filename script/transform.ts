import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const schemaPath = new URL(
	"../node_modules/wrangler/config-schema.json",
	import.meta.url,
);
const defaultWranglerSchema = JSON.parse(readFileSync(schemaPath, "utf8"));

defaultWranglerSchema["definitions"]["RawConfig"]["additionalProperties"] =
	true;

const newWranglerSchema = defaultWranglerSchema;
const outputDirPath = new URL("../schema/", import.meta.url);
const outputFilePath = new URL("../schema/wrangler.json", import.meta.url);

mkdirSync(outputDirPath, { recursive: true });
writeFileSync(outputFilePath, JSON.stringify(newWranglerSchema, null, 2));

console.log("Done writing");
