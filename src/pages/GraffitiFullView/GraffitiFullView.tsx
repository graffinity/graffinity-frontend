import SwipeableTextMobileStepper from "components/images/ImageSlider";
import LikeButton from "components/buttons/LikeButton";
import React from "react";
import "./GraffitiFulView.css";

export default function GraffitiFullView() {
	return (
		<div className="PeperStepper">
			<SwipeableTextMobileStepper />
			<div className="Button">
				<LikeButton />
			</div>
		</div>
	);
}
