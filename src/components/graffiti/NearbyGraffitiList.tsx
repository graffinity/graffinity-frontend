/* eslint-disable @typescript-eslint/no-unused-vars */
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import usePreventBodyScroll from "components/common/usePreventBodyScroll";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { animate } from "popmotion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Styler from "stylefire";
import NearbyGraffitiListItem from "./NearbyGraffitiListItem";
import useDrag from "./useDrag";
import "../map/Map.css";

interface NearbyGraffitiListProps {
	nearbyGraffitis: GraffitiResponse[];
}

const RTL = false;
type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const NearbyGraffitiList = (props: NearbyGraffitiListProps) => {
	const { nearbyGraffitis } = props;

	const [duration, setDuration] = useState(400);

	const [customAnimation, setCustomAnimation] = useState(false);

	const { disableScroll, enableScroll } = usePreventBodyScroll();
	const { dragStart, dragStop, dragMove, dragging } = useDrag();
	const handleDrag =
		({ scrollContainer }: scrollVisibilityApiType) =>
		(ev: React.MouseEvent) =>
			dragMove(ev, (posDiff) => {
				if (scrollContainer.current) {
					scrollContainer.current.scrollLeft += posDiff;
				}
			});

	// const onWheel = (
	// 	apiObj: scrollVisibilityApiType,
	// 	event: React.WheelEvent
	// ) => {
	// 	const isThouchpad =
	// 		Math.abs(event.deltaX) !== 0 || Math.abs(event.deltaY) < 30;
	// 	if (isThouchpad) {
	// 		event.stopPropagation();
	// 		return;
	// 	}
	// 	if (event.deltaY < 0) {
	// 		// NOTE: for transitions
	// 		apiObj.scrollNext(undefined, undefined, undefined, { duration });
	// 	} else if (event.deltaY > 0) {
	// 		apiObj.scrollPrev(undefined, undefined, undefined, { duration });
	// 	}
	// };

	function onWheel(
		apiObj: scrollVisibilityApiType,
		ev: React.WheelEvent
	): void {
		const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

		if (isThouchpad) {
			ev.stopPropagation();
			return;
		}

		if (ev.deltaY < 0) {
			apiObj.scrollNext();
		} else if (ev.deltaY > 0) {
			apiObj.scrollPrev();
		}
	}

	const apiRef: { current: scrollVisibilityApiType } = useRef<any>(null);
	useEffect(() => {
		if (RTL && apiRef.current?.scrollContainer.current)
			apiRef.current.scrollContainer.current.scrollLeft = 99999;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apiRef, RTL]);

	const LeftArrowComponent = useMemo(
		() =>
			RTL ? (
				<div
					className="hover-icon-effect"
					onClick={() => {
						let apiObj = apiRef.current;
						apiObj.scrollNext(undefined, undefined, undefined, { duration });
					}}
					style={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "16px",
					}}
				>
					<KeyboardArrowRight
						className="base-icon"
						sx={{
							height: "42px",
							width: "42px",
							color: "white",
							opacity: 0.6,
							alignSelf: "center",
						}}
					/>
				</div>
			) : (
				<div
					className="hover-icon-effect"
					onClick={() => {
						let apiObj = apiRef.current;
						apiObj.scrollPrev(undefined, undefined, undefined, { duration });
					}}
					style={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "16px",
					}}
				>
					<KeyboardArrowLeft
						className="base-icon"
						sx={{
							height: "42px",
							width: "42px",
							color: "white",
							opacity: 0.6,
							alignSelf: "center",
						}}
					/>
				</div>
			),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[RTL]
	);
	const RightArrowComponent = useMemo(
		() =>
			RTL ? (
				<div
					className="hover-icon-effect"
					onClick={() => {
						let apiObj = apiRef.current;
						apiObj.scrollPrev(undefined, undefined, undefined, { duration });
					}}
					style={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "16px",
					}}
				>
					<KeyboardArrowLeft
						className="base-icon"
						sx={{
							height: "42px",
							width: "42px",
							color: "white",
							opacity: 0.6,
							alignSelf: "center",
						}}
					/>
				</div>
			) : (
				<div
					onClick={() => {
						let apiObj = apiRef.current;
						apiObj.scrollNext(undefined, undefined, undefined, { duration });
					}}
					className="hover-icon-effect"
					style={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "16px",
					}}
				>
					<KeyboardArrowRight
						className="base-icon"
						sx={{
							height: "42px",
							width: "42px",
							color: "white",
							opacity: 0.6,
							alignSelf: "center",
						}}
					/>
				</div>
			),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[RTL]
	);

	return (
		<div
			style={{
				minHeight: "400px",
				marginTop: "40px",
				width: "100%",
			}}
			// onMouseEnter={disableScroll}
			onMouseLeave={enableScroll}
		>
			<div
				onMouseLeave={dragStop}
				style={{
					width: "100%",
				}}
			>
				<ScrollMenu
					LeftArrow={LeftArrowComponent}
					RightArrow={RightArrowComponent}
					apiRef={apiRef}
					RTL={RTL}
					// noPolyfill={false}
					transitionDuration={duration} // NOTE: for transitions
					transitionEase={easingFunctions.easeInOutCubic}
					transitionBehavior={scrollBehavior}
				>
					{nearbyGraffitis.map((graffiti) => (
						<div
							key={graffiti.id}
							style={{
								margin: "0px 12px",
								width: "300px",
								height: "100%",
							}}
						>
							<NearbyGraffitiListItem key={graffiti.id} graffiti={graffiti} />
						</div>
					))}
				</ScrollMenu>
			</div>
		</div>
	);
};

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
	const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

	if (isThouchpad) {
		ev.stopPropagation();
		return;
	}

	if (ev.deltaY < 0) {
		apiObj.scrollNext();
	} else if (ev.deltaY > 0) {
		apiObj.scrollPrev();
	}
}

const scrollBehavior = (instructions: [{ el: any; left: any }]) => {
	const [{ el, left }] = instructions;
	const styler = Styler(el);

	animate({
		from: el.scrollLeft,
		to: left,
		type: "spring",
		bounce: 0,
		onUpdate: (left) => styler.set("scrollLeft", left),
	});
};

const easingFunctions: EasingFunctions = {
	noEasing: undefined,
	// no easing, no acceleration
	linear: (t: any) => t,
	// accelerating from zero velocity
	easeInQuad: (t: number) => t * t,
	// decelerating to zero velocity
	easeOutQuad: (t: number) => t * (2 - t),
	// acceleration until halfway, then deceleration
	easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
	// accelerating from zero velocity
	easeInCubic: (t: number) => t * t * t,
	// decelerating to zero velocity
	easeOutCubic: (t: number) => --t * t * t + 1,
	// acceleration until halfway, then deceleration
	easeInOutCubic: (t: number) =>
		t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
	// accelerating from zero velocity
	easeInQuart: (t: number) => t * t * t * t,
	// decelerating to zero velocity
	easeOutQuart: (t: number) => 1 - --t * t * t * t,
	// acceleration until halfway, then deceleration
	easeInOutQuart: (t: number) =>
		t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
	// accelerating from zero velocity
	easeInQuint: (t: number) => t * t * t * t * t,
	// decelerating to zero velocity
	easeOutQuint: (t: number) => 1 + --t * t * t * t * t,
	// acceleration until halfway, then deceleration
	easeInOutQuint: (t: number) =>
		t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
	// Source https://gist.github.com/gre/1650294#file-easing-js
};

interface EasingFunctions {
	noEasing: undefined | ((t: any) => any);
	linear: (t: any) => any;
	easeInQuad: (t: number) => number;
	easeOutQuad: (t: number) => number;
	easeInOutQuad: (t: number) => number;
	easeInCubic: (t: number) => number;

	easeOutCubic: (t: number) => number;
	easeInOutCubic: (t: number) => number;

	easeInQuart: (t: number) => number;
	easeOutQuart: (t: number) => number;

	easeInOutQuart: (t: number) => number;
	easeInQuint: (t: number) => number;

	easeOutQuint: (t: number) => number;

	easeInOutQuint: (t: number) => number;
}

interface EasingFunctionsIndex {
	[key: string]: EasingFunctions[keyof EasingFunctions];
}

export default NearbyGraffitiList;
