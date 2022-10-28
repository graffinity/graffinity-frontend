/* eslint-disable @typescript-eslint/no-unused-vars */
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import ResponsiveAppBar from "components/common/Header";
import { useCallback, useState } from "react";

const containerStyle = {
	width: "800px",
	height: "600px",
};

const center = {
	lat: 54.730012,
	lng: 25.262638,
};

const center2 = {
	lat: 25.262648,
	lng: 54.730012,
};

const HomePage = () => {
	let googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NODE_ENV,
	});

	const [map, setMap] = useState<google.maps.Map | null>(null);

	const onLoad = useCallback(function callback(map: google.maps.Map) {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map: google.maps.Map) {
		setMap(null);
	}, []);
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}>
			<ResponsiveAppBar />
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					marginTop: "64px",
					marginBottom: "100px",
				}}>
				{isLoaded ? (
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={center}
						zoom={10}
						onLoad={onLoad}
						onUnmount={onUnmount}></GoogleMap>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default HomePage;