import { CoreHooks } from "@rbxts/roact-hooks";
import { RoactRoduxContext } from "../components/context";
import type Rodux from "@rbxts/rodux";

/**
 * A hook to access the Rodux Store.
 *
 * @returns The Rodux store
 */
export function useStore<S extends Rodux.Store<any>>(hooks: CoreHooks): S;
export function useStore<S, A extends Rodux.Action = Rodux.AnyAction>(hooks: CoreHooks): Rodux.Store<S, A>;
export function useStore(hooks: CoreHooks) {
	return hooks.useContext(RoactRoduxContext).store;
}

export default useStore;
