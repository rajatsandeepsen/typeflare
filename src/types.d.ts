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

type CF_BINDING_VALUE = Record<string, boolean>;

export type CF_Bindings = {
	d1_databases?: CF_BINDING_VALUE;
	r2_buckets?: CF_BINDING_VALUE;
	kv_namespaces?: CF_BINDING_VALUE;
	hyperdrive?: CF_BINDING_VALUE;
	analytics_engine_datasets?: CF_BINDING_VALUE;
	dispatch_namespaces?: CF_BINDING_VALUE;
	mtls_certificates?: CF_BINDING_VALUE;
	queues?: CF_BINDING_VALUE;
	ratelimits?: CF_BINDING_VALUE;
	secrets_store_secrets?: CF_BINDING_VALUE;
	services?: CF_BINDING_VALUE;
	vectorize?: CF_BINDING_VALUE;
	workflows?: CF_BINDING_VALUE;
	ai?: CF_BINDING_VALUE;
	assets?: CF_BINDING_VALUE;
	browser?: CF_BINDING_VALUE;
	images?: CF_BINDING_VALUE;
	version_metadata?: CF_BINDING_VALUE;
};

type ConvertFull<B extends CF_Bindings> = Record<
	keyof NonNullable<B["d1_databases"]>,
	D1Database
> &
	Record<keyof NonNullable<B["r2_buckets"]>, R2Bucket> &
	Record<keyof NonNullable<B["kv_namespaces"]>, KVNamespace> &
	Record<keyof NonNullable<B["hyperdrive"]>, Hyperdrive> &
	Record<
		keyof NonNullable<B["analytics_engine_datasets"]>,
		AnalyticsEngineDataset
	> &
	Record<keyof NonNullable<B["dispatch_namespaces"]>, DispatchNamespace> &
	Record<keyof NonNullable<B["mtls_certificates"]>, Fetcher> &
	Record<keyof NonNullable<B["queues"]>, Queue> &
	Record<keyof NonNullable<B["ratelimits"]>, RateLimit> &
	Record<keyof NonNullable<B["secrets_store_secrets"]>, SecretsStoreSecret> &
	Record<keyof NonNullable<B["services"]>, Service> &
	Record<keyof NonNullable<B["vectorize"]>, Vectorize> &
	Record<keyof NonNullable<B["workflows"]>, Workflow> &
	Record<keyof NonNullable<B["ai"]>, Ai> &
	Record<keyof NonNullable<B["assets"]>, Fetcher> &
	Record<keyof NonNullable<B["browser"]>, Fetcher> &
	Record<keyof NonNullable<B["images"]>, ImagesBinding> &
	Record<keyof NonNullable<B["version_metadata"]>, WorkerVersionMetadata>;

export type CF_Bindings_Convertor<B extends Partial<CF_Bindings>> = ConvertFull<
	Required<B>
>;
