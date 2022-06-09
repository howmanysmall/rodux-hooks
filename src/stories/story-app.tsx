import Hooks from "@rbxts/roact-hooks";
import Labels from "./labels";
import Provider from "../components/provider";
import Roact from "@rbxts/roact";
import Rodux from "@rbxts/rodux";
import StoryReducer from "./story-reducer";
import TextModifier from "./text-modifier";
import ValueModifier from "./value-modifier";

const Component: Hooks.FC<{}> = (_, hooks) => {
	const store = hooks.useValue(new Rodux.Store(StoryReducer, undefined)).value;

	return (
		<Provider store={store}>
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				AutomaticSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
				Key="MainFrame"
				Position={UDim2.fromScale(0.5, 0.5)}
				Size={new UDim2()}
			>
				<uilistlayout
					FillDirection={Enum.FillDirection.Vertical}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					Key="UIListLayout"
					Padding={new UDim(0, 5)}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>

				<Labels Key="Labels" LayoutOrder={0} />
				<TextModifier Key="TextModifier" LayoutOrder={1} />
				<ValueModifier Key="ValueModifier" LayoutOrder={2} />
			</frame>
		</Provider>
	);
};

export const App = new Hooks(Roact)(Component, {
	componentType: "PureComponent",
	name: "App",
});

export default App;
