import Rodux from "@rbxts/rodux";
import {
	ActionDecrementValue,
	ActionIncrementValue,
	ActionLowercaseText,
	ActionSetText,
	ActionSetValue,
	ActionUppercaseText,
} from "./story-actions";

const DefaultStoryData = {
	Text: "",
	Value: 0,
};

export type IStoryData = typeof DefaultStoryData;
export type StoryActions =
	| ActionDecrementValue
	| ActionIncrementValue
	| ActionLowercaseText
	| ActionSetText
	| ActionSetValue
	| ActionUppercaseText;

export const StoryReducer = Rodux.createReducer<IStoryData, StoryActions>(DefaultStoryData, {
	DecrementValue: (state: IStoryData, _) => {
		const newState = table.clone(state);
		newState.Value -= 1;
		return newState;
	},

	IncrementValue: (state: IStoryData, _) => {
		const newState = table.clone(state);
		newState.Value += 1;
		return newState;
	},

	SetText: (state: IStoryData, action) => {
		const newState = table.clone(state);
		newState.Text = action.Text;
		return newState;
	},

	SetValue: (state: IStoryData, action) => {
		const newState = table.clone(state);
		newState.Value = action.Value;
		return newState;
	},
});

export default StoryReducer;
