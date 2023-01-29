import React from "react";

const preventDefault = (event: Event) => {
	if (event.preventDefault) {
		event.preventDefault();
	}
	return event.defaultPrevented;
};

const enableBodyScroll = () => {
	document && document.removeEventListener("wheel", preventDefault, false);
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const disableBodyScroll = () => {
	document &&
		document.addEventListener("wheel", preventDefault, {
			passive: false,
		});
};

function usePreventBodyScroll() {
	const [hidden, setHidden] = React.useState(false);

	React.useEffect(() => {
		enableBodyScroll();

		return enableBodyScroll;
	}, [hidden]);

	const disableScroll = React.useCallback(() => setHidden(true), []);
	const enableScroll = React.useCallback(() => setHidden(false), []);
	return { disableScroll, enableScroll };
}

export default usePreventBodyScroll;
