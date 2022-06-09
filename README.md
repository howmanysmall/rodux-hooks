# rodux-hooks

Port of [littensy's roact-rodux-hooked](https://github.com/littensy/roact-rodux-hooked) for [kampf's RoactHooks](https://www.npmjs.com/package/@rbxts/roact-hooks) library.

```tsx
import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";
import { useDispatch, useSelector } from "@rbxts/rodux-hooks";
import { Store, StoreState, increment } from "./store";

const Component: Hooks.FC<{}> = (_, hooks) => {
	const count = useSelector(hooks, (state: StoreState) => state.count);
	const dispatch = useDispatch<Store>(hooks);

	return (
		<textbutton
			Text={`Counter: ${count}`}
			BackgroundColor3={Color3.fromRGB(80, 120, 200)}
			Size={new UDim2(0.5, 0, 1, 0)}
			Event={{
				Activated: () => dispatch(increment()),
			}}
		/>
	);
};

export const Counter = new Hooks(Roact)(Component);
```

```tsx
import { Provider } from "@rbxts/rodux-hooks";
import Roact from "@rbxts/roact";
import { Provider, store } from "./store";

export const App = () => {
	return (
		<Provider store={store}>
			...
		</Provider>
	);
};
```