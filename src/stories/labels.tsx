import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";

import { IStoryData } from "./story-reducer";
import useSelector from "../hooks/use-selector";

export interface ILabelsProps {
	AnchorPoint?: Roact.Binding<Vector2> | Vector2;
	LayoutOrder?: Roact.Binding<number> | number;
	Position?: Roact.Binding<UDim2> | UDim2;
}

const Component: Hooks.FC<ILabelsProps> = (props, hooks) => {
	const text = useSelector(hooks, (state: IStoryData) => state.Text);
	const value = useSelector(hooks, (state: IStoryData) => state.Value);

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

			<textlabel
				AutomaticSize={Enum.AutomaticSize.X}
				BackgroundColor3={Color3.fromRGB(60, 60, 60)}
				BorderSizePixel={0}
				Font={Enum.Font.Roboto}
				Key="TextLabel"
				RichText={true}
				Size={UDim2.fromOffset(0, 35)}
				Text={`Text: <font color="rgb(206,145,120)" face="RobotoMono" size="24">"${text}"</font>`}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={22}
			>
				<uipadding Key="UIPadding" PaddingLeft={new UDim(0, 12)} PaddingRight={new UDim(0, 12)} />
			</textlabel>

			<textlabel
				AutomaticSize={Enum.AutomaticSize.X}
				BackgroundColor3={Color3.fromRGB(60, 60, 60)}
				BorderSizePixel={0}
				Font={Enum.Font.Roboto}
				Key="ValueLabel"
				LayoutOrder={1}
				RichText={true}
				Size={UDim2.fromOffset(0, 35)}
				Text={`Value: <font color="rgb(181,206,168)" face="RobotoMono" size="24">${value}</font>`}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={22}
			>
				<uipadding Key="UIPadding" PaddingLeft={new UDim(0, 12)} PaddingRight={new UDim(0, 12)} />
			</textlabel>
		</frame>
	);
};

export const Labels = new Hooks(Roact)(Component, {
	componentType: "PureComponent",
	name: "Labels",
});

export default Labels;
