import Roact from "@rbxts/roact";
import App from "./story-app";

export = (target: GuiObject) => {
	const tree = Roact.mount(<App />, target, "AppStory");
	return () => Roact.unmount(tree);
};
