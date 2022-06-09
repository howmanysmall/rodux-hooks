import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";

import { ActionSetText, LowercaseText, SetText, UppercaseText } from "./story-actions";
import useDispatch from "../hooks/use-dispatch";

export interface ITextModifierProps {
	AnchorPoint?: Roact.Binding<Vector2> | Vector2;
	LayoutOrder?: Roact.Binding<number> | number;
	Position?: Roact.Binding<UDim2> | UDim2;
}

const Component: Hooks.FC<ITextModifierProps> = (props, hooks) => {
	const dispatch = useDispatch<ActionSetText>(hooks);
	const [currentText, setCurrentText] = hooks.useBinding("");

	const onTextChange = hooks.useCallback((rbx: TextBox) => setCurrentText(rbx.Text), []);

	const onSetActivated = hooks.useCallback(() => {
		dispatch(SetText(currentText.getValue()));
	}, [dispatch]);

	const onLowerActivated = hooks.useCallback(() => {
		dispatch(LowercaseText(currentText.getValue()));
	}, [dispatch]);

	const onUpperActivated = hooks.useCallback(() => {
		dispatch(UppercaseText(currentText.getValue()));
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
				Key="TextBox"
				PlaceholderColor3={Color3.fromRGB(170, 170, 170)}
				PlaceholderText="Entry..."
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
				Event={{ Activated: onUpperActivated }}
				Font={Enum.Font.GothamMedium}
				Key="UppercaseButton"
				LayoutOrder={2}
				Size={UDim2.fromOffset(100, 35)}
				Text="Upper"
				TextColor3={Color3.fromRGB(204, 204, 204)}
				TextSize={22}
			/>

			<textbutton
				BackgroundColor3={Color3.fromRGB(60, 60, 60)}
				BorderSizePixel={0}
				Event={{ Activated: onLowerActivated }}
				Font={Enum.Font.GothamMedium}
				Key="LowercaseButton"
				LayoutOrder={3}
				Size={UDim2.fromOffset(100, 35)}
				Text="Lower"
				TextColor3={Color3.fromRGB(204, 204, 204)}
				TextSize={22}
			/>
		</frame>
	);
};

export const TextModifier = new Hooks(Roact)(Component, {
	componentType: "PureComponent",
	name: "TextModifier",
});

export default TextModifier;
