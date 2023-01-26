import SwipeableTextMobileStepper from "components/images/ImageSlider";
import LikeButton from "components/buttons/LikeButton";
import Description from "components/common/FullViewDesc";
import React, { useEffect, useState } from "react";
import "./GraffitiFulView.css";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import GraffitiAPI from "api/GraffitiPostAPI";
import { useParams } from "react-router-dom";

export default function GraffitiFullView() {
	const { id } = useParams();
	const [graffiti, setGraffiti] = useState<GraffitiResponse>({
		id: 0,
		name: "",
		photos: [],
		description: "",
		latitude: 0,
		longitude: 0,
		address: "",
		authorId: 0,
		creationDate: new Date(),
	});
	useEffect(() => {
		console.log("graffitiId", id);
		getGraffiti();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const getGraffiti = async () => {
		if (id) {
			let response = await GraffitiAPI.findById(+id);
			setGraffiti(response);
		}
	};

	return (
		<div className="PeperStepper">
			<div className="PhotoContainer">
				<SwipeableTextMobileStepper />
				<div className="Button">
					<LikeButton />
				</div>
			</div>
			<div className="DescriptionContainer">
				<Description graffiti={graffiti} />
			</div>
		</div>
	);
}
