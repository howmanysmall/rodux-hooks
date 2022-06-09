import Object from "@rbxts/object-utils";

export const shallowEqual = <T>(left: T, right: unknown) => {
	if (left === right) return true;
	if (!typeIs(left, "table") || !typeIs(right, "table")) return false;

	const keysLeft = Object.keys(left) as (keyof T)[];
	const keysRight = Object.keys(right) as (keyof typeof right)[];

	if (keysLeft.size() !== keysRight.size()) return false;
	return keysLeft.every((value, index) => value === right[index as never]);
};

export default shallowEqual;
