import SwipeableTextMobileStepper from "components/common/ImageSlider";
import LikeButton from "components/common/LikeButton";
import React from "react";
import "./GraffitiFulView.css";
import { useParams } from "react-router-dom";
import GraffitiPostAPI from "api/GraffitiPostAPI";

export default function GraffitiFullView() {
	const { id } = useParams<{ id: string }>();

	// const getPictures = async () => {
	// 	if (id) {
	// 		const graffiti = await GraffitiPostAPI.findById(+id);
	// 	}
	// };

	return (
		<div className="PeperStepper">
			<SwipeableTextMobileStepper />
			<div className="Button">
				<LikeButton />
			</div>
		</div>
	);
}
