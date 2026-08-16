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

type UnionToIntersection<U> = [U] extends [never]
	? never
	: (U extends unknown ? (arg: U) => void : never) extends (
				arg: infer I,
			) => void
		? I
		: never;

export type HasKey<T, K extends PropertyKey> = K extends keyof T ? true : false;

type GetByKeyUnion<T, K extends PropertyKey> = T extends object
	?
			| (HasKey<T, K> extends true ? T[K & keyof T] : never)
			| { [P in keyof T]: GetByKeyUnion<T[P], K> }[keyof T]
	: never;

export type Get<T, K extends PropertyKey> = [GetByKeyUnion<T, K>] extends [
	never,
]
	? {}
	: UnionToIntersection<GetByKeyUnion<T, K>>;

export type Equals<X, Y> =
	(<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
		? true
		: false;
