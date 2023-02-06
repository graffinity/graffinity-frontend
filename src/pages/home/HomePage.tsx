import GraffitiAPI from "api/GraffitiAPI";
import NearbyGraffitiList from "components/graffiti/NearbyGraffitiList";
import MapComponent from "components/map/MapComponent";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import MarkerData from "models/map/MarkerData";
import SavedUserLocation from "models/map/SavedUserLocation";
import { useEffect, useRef, useState } from "react";
import common from "redux/common";
import { useAppSelector } from "redux/store/hooks";
import "./HomePage.css";
import { Divider, Typography } from "@mui/material";

const HomePage = () => {
	const userCoords = useAppSelector((state) => state.common.userLocation);
	const status = useAppSelector((state) => state.common);

	const [width, setWidth] = useState<number>(window.innerWidth);
	const [height, setHeight] = useState<number>(window.innerHeight);
	const [markers, setMarkers] = useState<MarkerData[]>([]);
	const [graffitis, setGraffitis] = useState<GraffitiResponse[]>([]);
	const [nearbyGraffitis, setNearbyGraffitis] = useState<GraffitiResponse[]>(
		[]
	);

	const containerRef = useRef<HTMLDivElement | null>(null);

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
		common.getUserLocation();
		getGraffitis();
		getMarkers(graffitis);
		if (userCoords) {
			getNearbyGraffitis();
		}

		if (containerRef.current) {
			setHeight(containerRef.current.clientHeight);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (userCoords) {
			getNearbyGraffitis();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userCoords]);

	useEffect(() => {
		console.log("Status: ", status);
	}, [status]);

	const getGraffitis = async () => {
		let response = await GraffitiAPI.findAll();
		getMarkers(response);

		setGraffitis(response);
	};

	const getNearbyGraffitis = async () => {
		if (!userCoords) {
			common.getUserLocation();
			// let userLocation: GeolocationPosition = {
			// 	coords: {
			// 		latitude: 0,
			// 		longitude: 0,
			// 		accuracy: 0,
			// 		altitude: null,
			// 		altitudeAccuracy: null,
			// 		heading: null,
			// 		speed: null,
			// 	},
			// 	timestamp: 0,
			// };

			// if (userLocation.coords.latitude && userLocation.coords.longitude) {
			// 	let request: SavedUserLocation = {
			// 		latitude: userLocation.coords.latitude,
			// 		longitude: userLocation.coords.longitude,
			// 		savedAt: new Date(),
			// 	};
			// 	let response = await GraffitiAPI.findNearbyGraffiti(request);
			// 	setNearbyGraffitis(response);
			// 	return response;
			// }
		}
		if (userCoords) {
			let request: SavedUserLocation = userCoords;
			let response = await GraffitiAPI.findNearbyGraffiti(request);
			setNearbyGraffitis(response);
			return response;
		}
		// if (userCoords) {
		// 	let request: SavedUserLocation = userCoords;
		// 	let response = await GraffitiAPI.findNearbyGraffiti(request);
		// 	setNearbyGraffitis(response);

		// 	return response;
		// }
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
						padding: "16px 32px",
						boxSizing: "border-box",
					}}
				>
					<Divider
						style={{
							backgroundColor: "#FFFFFF",
							marginTop: "48px",
							marginBottom: "24px",
						}}
					/>

					<Typography
						variant="h1"
						style={{
							marginBottom: "-72px",
							marginLeft: "16px",
							color: "#FFFFFF",
						}}
					>
						Graffitis "Nearby"
					</Typography>
				</div>
				<div
					style={{
						width: "calc(100% + 48px)",
						height: "100%",
						marginTop: "72px",

						marginBottom: "108px",
						marginLeft: "-48px",
						marginRight: "-48px",
					}}
				>
					{userCoords && (
						<NearbyGraffitiList nearbyGraffitis={nearbyGraffitis} />
					)}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
