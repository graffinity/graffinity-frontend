/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "@mui/system";
import GraffitiPostAPI from "api/GraffitiPostAPI";
import MultiActionAreaCard from "components/common/Card";
import MapComponent from "components/map/MapComponent";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import GraffitiPhotoResponse from "models/graffitiphoto/GraffitiPhotoResponse";

export interface MarkerData {
	id: number;
	name: string;
	position: {
		lat: number;
		lng: number;
	};
	images: string[];
}

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

	const [scriptLoaded, setScriptLoaded] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const getGraffitis = async () => {
		let response = await GraffitiPostAPI.findAll();
		getMarkers(response);

		setGraffitis(response);
	};

	const getGraffitiPhotos = async (photos: GraffitiPhotoResponse[]) => {
		let fetchedPhotos = photos.map(async (photo) => {
			console.log("photo", photo)
			let res = await fetch(photo.url);
			let blob = await res.blob();
			let objectURL = URL.createObjectURL(blob);
			console.log("objectURL", objectURL);
			return objectURL;
		});
		let response = await Promise.all(fetchedPhotos).then((values) => {
			return values;
		});

		return response;
	};

	const getMarkers = async (graffitis: GraffitiResponse[]) => {
		let markers = graffitis.map(async (graffiti) => {
			let photos = await getGraffitiPhotos(graffiti.photos);

			let lat = Number(graffiti.latitude);
			let lng = Number(graffiti.longitude);

			const newMarker: MarkerData = {
				id: graffiti.id,
				name: graffiti.name,
				position: {
					lat: lat,
					lng: lng,
				},
				images: photos,
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
				{/* <div className="left"> */}
				{/* </div> */}

				<Container
					ref={containerRef}
					className="right"
				>
					<div
					style={{
						// marginTop: "36px",/
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
function setHeight(innerHeight: number) {
	throw new Error("Function not implemented.");
}
