import { CoreHooks } from "@rbxts/roact-hooks";
import type { InferStoreAction } from "../types";
import type Rodux from "@rbxts/rodux";
import useStore from "./use-store";

/**
 * A hook to access the Rodux Store's `dispatch` method.
 *
 * @returns Rodux store's `dispatch` method
 */
export function useDispatch<A extends Rodux.Action = Rodux.AnyAction>(hooks: CoreHooks): Rodux.Dispatch<A>;
export function useDispatch<S extends Rodux.Store<any>>(hooks: CoreHooks): Rodux.Dispatch<InferStoreAction<S>>;
export function useDispatch<Dispatch = Rodux.Dispatch<any>>(hooks: CoreHooks): Dispatch;
export function useDispatch(hooks: CoreHooks) {
	const store = useStore(hooks);
	return hooks.useValue((action: Rodux.AnyAction) => store.dispatch(action)).value;
}

export default useDispatch;
