import Rodux from "@rbxts/rodux";

export interface ActionSetText extends Rodux.Action<"SetText"> {
	Text: string;
}

export interface ActionLowercaseText extends Rodux.Action<"SetText"> {
	Text: string;
}

export interface ActionUppercaseText extends Rodux.Action<"SetText"> {
	Text: string;
}

export interface ActionSetValue extends Rodux.Action<"SetValue"> {
	Value: number;
}

export interface ActionDecrementValue extends Rodux.Action<"DecrementValue"> {}
export interface ActionIncrementValue extends Rodux.Action<"IncrementValue"> {}

export const SetText = Rodux.makeActionCreator("SetText", (text: string) => {
	return {
		Text: text,
	};
});

export const LowercaseText = Rodux.makeActionCreator("SetText", (text: string) => {
	return {
		Text: text.lower(),
	};
});

export const UppercaseText = Rodux.makeActionCreator("SetText", (text: string) => {
	return {
		Text: text.upper(),
	};
});

export const SetValue = Rodux.makeActionCreator("SetValue", (value: number) => {
	return {
		Value: value,
	};
});

export const DecrementValue = Rodux.makeActionCreator("DecrementValue", () => {
	return {};
});

export const IncrementValue = Rodux.makeActionCreator("IncrementValue", () => {
	return {};
});
