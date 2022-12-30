/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "@mui/system";
import GraffitiPostAPI from "api/GraffitiPostAPI";
import MultiActionAreaCard from "components/common/Card";
import MapComponent from "components/map/MapComponent";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useRef, useState } from "react";
import "./HomePage.css";

export interface MarkerData {
	id: number;
	name: string;
	position: {
		lat: number;
		lng: number;
	};
	image: string;
}

const HomePage = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [graffitis, setGraffitis] = useState<GraffitiResponse[]>([]);
	const [height, setHeight] = useState<number | null>(null);
	const [markers, setMarkers] = useState<MarkerData[]>([]);

	window.addEventListener("resize", () => {
		setWidth(window.innerWidth);
	});
	window.addEventListener("resize", () => {
		if (containerRef.current) {
			setHeight(containerRef.current.clientHeight);
			return;
		}
		setHeight(window.innerHeight);
		console.log("height", height);
	});
	useEffect(() => {
		getGraffitis();
		// getMarkers(graffitis);

		if (containerRef.current) {
			setHeight(containerRef.current.clientHeight);
			return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [scriptLoaded, setScriptLoaded] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const getGraffitis = async () => {
		let response = await GraffitiPostAPI.findAll();

		getMarkers(response);
		console.log("graffitis", response);
		setGraffitis(response);
	};

	const getMarkers = (graffitis: GraffitiResponse[]) => {
		console.log("KRWWWWWs", graffitis);
		console.log("lol");
		let markersKrc = graffitis.map((graffiti) => {
			let loc = graffiti.location.split(",");
			let lat1 = parseFloat(loc[0]);
			let lng1 = parseFloat(loc[1]);

			const newMarker: MarkerData = {
				id: graffiti.id,
				name: graffiti.name,
				position: {
					lat: lat1,
					lng: lng1,
				},
				image:
					"/Users/kernius/graffinity/frontend-graffinity/src/components/map/testPic.jpg",
			};

			return newMarker;
		});
		console.log("matkers", markersKrc);
		setMarkers(markersKrc);
		return markersKrc;
	};

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div className="homepage-container">
				<div className="left">
					<MultiActionAreaCard />
				</div>

				<Container
					ref={containerRef}
					className="right"
					style={{
						height: "100%",
						maxWidth: "50vw",
					}}
				>
					<MapComponent
						width={width}
						height={height}
						graffitis={graffitis}
						markers={markers}
					/>
				</Container>
			</div>
		</div>
	);
};

export default HomePage;
function setHeight(innerHeight: number) {
	throw new Error("Function not implemented.");
}
