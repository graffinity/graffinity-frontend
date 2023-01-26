import GraffitiAPI from "api/GraffitiPostAPI";
import FullViewDescription from "components/graffiti/FullViewDescription";
import ImageSlider from "components/images/ImageSlider";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GraffitiFullView.css";

export default function GraffitiFullView() {
	const { id } = useParams();
	const [graffiti, setGraffiti] = useState<GraffitiResponse>();
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
		<div
			className="PeperStepper"
			style={{
				display: "flex",
				gap: "32px",
			}}
		>
			<div
				className="PhotoContainer"
				style={{
					width: "calc(100%-128px)",
					flex: 2,
				}}
			>
				{graffiti && <ImageSlider graffiti={graffiti} />}
			</div>
			<div
				className="DescriptionContainer"
				style={{
					width: "calc(100%-128px)",
					flex: 1,
				}}
			>
				<FullViewDescription graffiti={graffiti} />
			</div>
		</div>
	);
}
