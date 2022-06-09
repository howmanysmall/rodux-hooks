import { Action, AnyAction } from "@rbxts/rodux";
import Roact from "@rbxts/roact";
import type { IRoactContext } from "../types";
import type { Store } from "@rbxts/rodux";

export interface IRoactRoduxContextValue<A extends Action = AnyAction> {
	/**
	 * The single Rodux store in your application.
	 */
	store: Store<any, A>;
}

export type RoactRoduxContext<A extends Action = AnyAction> = IRoactContext<IRoactRoduxContextValue<A>>;

export const RoactRoduxContext: RoactRoduxContext = Roact.createContext<IRoactRoduxContextValue>(undefined!);
