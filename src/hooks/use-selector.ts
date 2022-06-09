import { CoreHooks } from "@rbxts/roact-hooks";
import useStore from "./use-store";

/**
 * This interface allows you to easily create a hook that is properly typed for your store's root state.
 *
 * @example
 * interface RootState {
 *   property: string;
 * }
 *
 * const useAppSelector: ITypedUseSelectorHook<RootState> = useSelector;
 */
export interface ITypedUseSelectorHook<State> {
	<Selected>(
		selector: (state: State) => Selected,
		equalityFn?: (selectedState?: Selected, oldSelectedState?: Selected) => boolean,
		// equalityFn?: (selectedState: Selected | undefined, oldSelectedState: Selected | undefined) => boolean,
	): Selected;
}

/**
 * A hook to access the Rodux Store's state. This hook takes a selector function as an argument. The selector is called
 * with the store state.
 *
 * This hook takes an optional equality comparison function as the second parameter that allows you to customize the
 * way the selected state is compared to determine whether the component needs to be re-rendered.
 *
 * @param selector - The selector function
 * @param equalityFn - The function that will be used to determine equality
 *
 * @returns The selected portion of the state
 */
export const useSelector = <State = {}, Selected = unknown>(
	hooks: CoreHooks,
	selector: (state: State) => Selected,
	equalityFn: (selectedState?: Selected, oldSelectedState?: Selected) => boolean = (a, b) => a === b,
): Selected => {
	const [, forceRender] = hooks.useReducer((s: number) => s + 1, 0);
	const store = useStore<State>(hooks);

	const latestSubscriptionCallbackError = hooks.useValue<string | undefined>();
	const latestSelector = hooks.useValue<(state: State) => Selected>();
	const latestStoreState = hooks.useValue<State>();
	const latestSelectedState = hooks.useValue<Selected | undefined>();

	const storeState = store.getState();
	let selectedState: Selected | undefined;

	try {
		if (
			selector !== latestSelector.value ||
			storeState !== latestStoreState.value ||
			latestSubscriptionCallbackError.value
		) {
			const newSelectedState = selector(storeState);
			// ensure latest selected state is reused so that a custom equality function can result in identical references
			if (latestSelectedState.value === undefined || !equalityFn(newSelectedState, latestSelectedState.value))
				selectedState = newSelectedState;
			else selectedState = latestSelectedState.value;
		} else selectedState = latestSelectedState.value;
	} catch (err) {
		if (latestSubscriptionCallbackError.value !== undefined)
			err += `\nThe error may be correlated with this previous error:\n${latestSubscriptionCallbackError.value}\n\n`;

		throw err;
	}

	hooks.useEffect(() => {
		latestSelector.value = selector;
		latestStoreState.value = storeState;
		latestSelectedState.value = selectedState;
		latestSubscriptionCallbackError.value = undefined;
	});

	hooks.useEffect(() => {
		const checkForUpdates = (newStoreState: State) => {
			try {
				// Avoid calling selector multiple times if the store's state has not changed
				if (newStoreState === latestStoreState.value) return;
				const newSelectedState = latestSelector.value!(newStoreState);
				if (equalityFn(newSelectedState, latestSelectedState.value)) return;

				latestSelectedState.value = newSelectedState;
				latestStoreState.value = newStoreState;
			} catch (err) {
				// we ignore all errors here, since when the component
				// is re-rendered, the selectors are called again, and
				// will throw again, if neither props nor store state
				// changed
				latestSubscriptionCallbackError.value = err as string;
			}

			task.spawn(<() => void>forceRender); // weird error unless i include da cast
		};

		const subscription = store.changed.connect(checkForUpdates);

		checkForUpdates(store.getState());
		return () => subscription.disconnect();
	}, [store]);

	return selectedState as Selected;
};

export default useSelector;
