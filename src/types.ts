import type {
	Ai,
	AnalyticsEngineDataset,
	D1Database,
	DispatchNamespace,
	Fetcher,
	Hyperdrive,
	ImagesBinding,
	KVNamespace,
	Queue,
	R2Bucket,
	RateLimit,
	SecretsStoreSecret,
	Service,
	Vectorize,
	WorkerVersionMetadata,
	Workflow,
} from "@cloudflare/workers-types";
import type {
	CreateRecordIfValid as CreateRecord,
	DuplicateNames,
	GetValidKeys,
} from "./utils";

export type CF_Bindings<V = unknown> = {
	d1_databases?: V;
	r2_buckets?: V;
	kv_namespaces?: V;
	hyperdrive?: V;
	analytics_engine_datasets?: V;
	dispatch_namespaces?: V;
	mtls_certificates?: V;
	queues?: V;
	ratelimits?: V;
	secrets_store_secrets?: V;
	services?: V;
	vectorize?: V;
	ai?: V;
	workflows?: V;
	assets?: V;
	browser?: V;
	images?: V;
	version_metadata?: V;
};

type TypeFlareBindingsValues = Record<string, boolean | null>;
export type TypeFlareBindings = CF_Bindings<TypeFlareBindingsValues>;

type Convert<
	INPUT extends TypeFlareBindings,
	ValidB = CheckDupicates<GetValidKeys<INPUT>>,
> = ValidB extends string
	? ValidB
	: CreateRecord<ValidB, "d1_databases", D1Database> &
			CreateRecord<ValidB, "r2_buckets", R2Bucket> &
			CreateRecord<ValidB, "kv_namespaces", KVNamespace> &
			CreateRecord<ValidB, "hyperdrive", Hyperdrive> &
			CreateRecord<ValidB, "dispatch_namespaces", DispatchNamespace> &
			CreateRecord<ValidB, "mtls_certificates", Fetcher> &
			CreateRecord<ValidB, "queues", Queue> &
			CreateRecord<ValidB, "ratelimits", RateLimit> &
			CreateRecord<ValidB, "secrets_store_secrets", SecretsStoreSecret> &
			CreateRecord<ValidB, "services", Service> &
			CreateRecord<ValidB, "vectorize", Vectorize> &
			CreateRecord<ValidB, "workflows", Workflow> &
			CreateRecord<ValidB, "ai", Ai> &
			CreateRecord<ValidB, "assets", Fetcher> &
			CreateRecord<ValidB, "browser", Fetcher> &
			CreateRecord<ValidB, "images", ImagesBinding> &
			CreateRecord<ValidB, "version_metadata", WorkerVersionMetadata> &
			CreateRecord<ValidB, "analytics_engine_datasets", AnalyticsEngineDataset>;

export type Bindings<B extends Partial<TypeFlareBindings>> = Convert<
	Required<B>
>;

type CheckDupicates<T extends Record<string, PropertyKey>> =
	DuplicateNames<T> extends never
		? T
		: DuplicateNames<T> extends string
			? `ERROR: Duplicate Binding Name [${DuplicateNames<T>}]`
			: "ERROR: Duplicate Binding Name Found";
