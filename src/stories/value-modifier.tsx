import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";

import useDispatch from "../hooks/use-dispatch";

import {
	ActionDecrementValue,
	ActionIncrementValue,
	ActionSetValue,
	DecrementValue,
	IncrementValue,
	SetValue,
} from "./story-actions";

export interface IValueModifierProps {
	AnchorPoint?: Roact.Binding<Vector2> | Vector2;
	LayoutOrder?: Roact.Binding<number> | number;
	Position?: Roact.Binding<UDim2> | UDim2;
}

const GetNumberFromString = (value: string | number) => {
	if (value === undefined || !typeIs(value, "string"))
		return value !== undefined && typeIs(value, "number") ? value : 0;
	else {
		const number = tonumber(value);
		if (number !== undefined) return number;
		else {
			const match = string.match(value, "%-?%d+%.?%d*")[0];
			return match !== undefined ? tonumber(match) ?? 0 : 0;
		}
	}
};

const Component: Hooks.FC<IValueModifierProps> = (props, hooks) => {
	const dispatch = useDispatch<ActionSetValue | ActionIncrementValue | ActionDecrementValue>(hooks);
	const [currentText, setCurrentText] = hooks.useBinding("");

	const onTextChange = hooks.useCallback((rbx: TextBox) => setCurrentText(rbx.Text), []);

	const onSetActivated = hooks.useCallback(() => {
		dispatch(SetValue(GetNumberFromString(currentText.getValue())));
	}, [dispatch]);

	const onDecrementActivated = hooks.useCallback(() => {
		dispatch(DecrementValue());
	}, [dispatch]);

	const onIncrementActivated = hooks.useCallback(() => {
		dispatch(IncrementValue());
	}, [dispatch]);

	return (
		<frame
			AnchorPoint={props.AnchorPoint}
			AutomaticSize={Enum.AutomaticSize.XY}
			BackgroundTransparency={1}
			LayoutOrder={props.LayoutOrder}
			Position={props.Position}
			Size={new UDim2()}
		>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				Key="UIListLayout"
				Padding={new UDim(0, 5)}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>

			<textbox
				BackgroundColor3={Color3.fromRGB(37, 37, 37)}
				BorderSizePixel={0}
				Change={{ Text: onTextChange }}
				Font={Enum.Font.Gotham}
				Key="ValueBox"
				PlaceholderColor3={Color3.fromRGB(170, 170, 170)}
				PlaceholderText="Value..."
				Size={UDim2.fromOffset(200, 35)}
				Text={currentText}
				TextColor3={Color3.fromRGB(204, 204, 204)}
				TextSize={22}
			/>

			<textbutton
				BackgroundColor3={Color3.fromRGB(0, 162, 255)}
				BorderSizePixel={0}
				Event={{ Activated: onSetActivated }}
				Font={Enum.Font.GothamBlack}
				Key="SetButton"
				LayoutOrder={1}
				Size={UDim2.fromOffset(100, 35)}
				Text="Set"
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={22}
			/>

			<textbutton
				BackgroundColor3={Color3.fromRGB(60, 60, 60)}
				BorderSizePixel={0}
				Event={{ Activated: onIncrementActivated }}
				Font={Enum.Font.GothamMedium}
				Key="IncrementButton"
				LayoutOrder={2}
				Size={UDim2.fromOffset(100, 35)}
				Text="+1"
				TextColor3={Color3.fromRGB(204, 204, 204)}
				TextSize={22}
			/>

			<textbutton
				BackgroundColor3={Color3.fromRGB(60, 60, 60)}
				BorderSizePixel={0}
				Event={{ Activated: onDecrementActivated }}
				Font={Enum.Font.GothamMedium}
				Key="DecrementButton"
				LayoutOrder={3}
				Size={UDim2.fromOffset(100, 35)}
				Text="-1"
				TextColor3={Color3.fromRGB(204, 204, 204)}
				TextSize={22}
			/>
		</frame>
	);
};

export const ValueModifier = new Hooks(Roact)(Component, {
	componentType: "PureComponent",
	name: "ValueModifier",
});

export default ValueModifier;
