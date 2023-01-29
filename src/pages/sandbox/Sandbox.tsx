/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import GraffitiAPI from "api/GraffitiAPI";
import NearbyGraffitiListComponent from "components/graffiti/NearbyGraffitiListItem";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useState } from "react";
import "./Sandbox.css";

const maxNumber = 6900000;

const Sandbox = () => {
	// Nearby Graffiti Component Draft 1

	const [graffiti, setGraffiti] = useState<GraffitiResponse | null>(null);

	useEffect(() => {
		getGrafitti();
	}, []);

	const getGrafitti = async () => {
		const graffiti = await GraffitiAPI.findById(1);
		setGraffiti(graffiti);
	};

	const distance = 480;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
			}}
		>
			{graffiti && (
				<NearbyGraffitiListComponent graffiti={graffiti} distance={distance} />
			)}
		</div>
	);
};

export default Sandbox;
