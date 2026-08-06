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
	ValidB = GetValidKeys<INPUT>,
> = BindingRecord<ValidB, "d1_databases", D1Database> &
	BindingRecord<ValidB, "r2_buckets", R2Bucket> &
	BindingRecord<ValidB, "kv_namespaces", KVNamespace> &
	BindingRecord<ValidB, "hyperdrive", Hyperdrive> &
	BindingRecord<ValidB, "dispatch_namespaces", DispatchNamespace> &
	BindingRecord<ValidB, "mtls_certificates", Fetcher> &
	BindingRecord<ValidB, "queues", Queue> &
	BindingRecord<ValidB, "ratelimits", RateLimit> &
	BindingRecord<ValidB, "secrets_store_secrets", SecretsStoreSecret> &
	BindingRecord<ValidB, "services", Service> &
	BindingRecord<ValidB, "vectorize", Vectorize> &
	BindingRecord<ValidB, "workflows", Workflow> &
	BindingRecord<ValidB, "ai", Ai> &
	BindingRecord<ValidB, "assets", Fetcher> &
	BindingRecord<ValidB, "browser", Fetcher> &
	BindingRecord<ValidB, "images", ImagesBinding> &
	BindingRecord<ValidB, "version_metadata", WorkerVersionMetadata> &
	BindingRecord<ValidB, "analytics_engine_datasets", AnalyticsEngineDataset>;

export type Bindings<B extends Partial<TypeFlareBindings>> = Convert<
	Required<B>
>;

type GetValidKeys<T extends Record<string, Record<string, unknown>>> = {
	[Group in keyof T]: {
		[K in keyof T[Group]]: null extends T[Group][K] ? never : K;
	}[keyof T[Group]];
};

type BindingRecord<B, K extends PropertyKey, V> = K extends keyof B
	? B[K] extends string
		? Record<B[K], V>
		: {}
	: {};
