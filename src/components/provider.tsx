import Hooks from "@rbxts/roact-hooks";
import { RoactRoduxContext } from "./context";
import Roact from "@rbxts/roact";
import type { Action, AnyAction, Store } from "@rbxts/rodux";

export interface IProviderProps<A extends Action = AnyAction> {
	/**
	 * The single Rodux store in your application.
	 */
	store: Store<any, A>;
}

const Component: Hooks.FC<IProviderProps> = ({ store, [Roact.Children]: children }, hooks) => {
	const contextValue = hooks.useMemo(() => ({ store }), [store]);
	return <RoactRoduxContext.Provider value={contextValue}>{children}</RoactRoduxContext.Provider>;
};

/**
 * Makes the Rodux store available to the `useStore()` calls in the component hierarchy below.
 */
export const Provider = new Hooks(Roact)(Component, {
	componentType: "PureComponent",
	name: "Provider",
});

export default Provider;
