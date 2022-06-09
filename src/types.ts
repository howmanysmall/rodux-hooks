import type Roact from "@rbxts/roact";
import type Rodux from "@rbxts/rodux";

export interface IRoactContext<T> {
	Consumer: Roact.ComponentConstructor<{
		render: (value: T) => Roact.Element | Roact.Fragment | undefined;
	}>;

	Provider: Roact.ComponentConstructor<{ value: T }>;
}

export type InferStoreState<T> = T extends Rodux.Store<infer S> ? S : never;
export type InferStoreAction<T> = T extends Rodux.Store<any, infer A> ? A : never;
