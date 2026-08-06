export type GetValidKeys<T extends Record<string, Record<string, unknown>>> = {
	[Group in keyof T]: {
		[K in keyof T[Group]]: null extends T[Group][K] ? never : K;
	}[keyof T[Group]];
};

type IsUnion<T, U = T> = T extends T ? ([U] extends [T] ? false : true) : never;

type KeysContaining<T, V extends PropertyKey> = {
	[K in keyof T]: V extends T[K] ? K : never;
}[keyof T];

export type DuplicateNames<T extends Record<string, PropertyKey>> = {
	[V in T[keyof T] & PropertyKey]: IsUnion<KeysContaining<T, V>> extends true
		? V
		: never;
}[T[keyof T] & PropertyKey];

export type CreateRecordIfValid<B, K extends PropertyKey, V> = K extends keyof B
	? B[K] extends string
		? Record<B[K], V>
		: {}
	: {};
