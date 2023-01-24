import { Container } from "@mui/system";
import GraffitiAPI from "api/GraffitiPostAPI";
import MultiActionAreaCard from "components/common/TitleCard";
import MapComponent from "components/map/MapComponent";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import MarkerData from "models/map/MarkerData";
import { useEffect, useRef, useState } from "react";
import "./HomePage.css";

const HomePage = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [graffitis, setGraffitis] = useState<GraffitiResponse[]>([]);
	const [height, setHeight] = useState<number>(window.innerHeight);
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
	});
	useEffect(() => {
		getGraffitis();
		getMarkers(graffitis);

		if (containerRef.current) {
			setHeight(containerRef.current.clientHeight);
			return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const containerRef = useRef<HTMLDivElement | null>(null);

	const getGraffitis = async () => {
		let response = await GraffitiAPI.findAll();
		getMarkers(response);

		setGraffitis(response);
	};

	const getMarkers = async (graffitis: GraffitiResponse[]) => {
		let markers = graffitis.map(async (graffiti) => {
			let lat = Number(graffiti.latitude);
			let lng = Number(graffiti.longitude);

			const newMarker: MarkerData = {
				id: graffiti.id,
				name: graffiti.name,
				position: {
					lat: lat,
					lng: lng,
				},
				photos: graffiti.photos,
			};

			return newMarker;
		});
		let response = await Promise.all(markers).then((values) => {
			setMarkers(values);
			return values;
		});
		return response;
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
				<Container ref={containerRef} className="right">
					<div
						style={{
							marginTop: "36px",
						}}
					>
						<MapComponent width={width} height={height} markers={markers} />
					</div>
					<div
						style={{
							width: "100%",
							height: "100%",
							marginTop: "36px",
						}}
					>
						<MultiActionAreaCard />
					</div>
				</Container>
			</div>
		</div>
	);
};

export default HomePage;
