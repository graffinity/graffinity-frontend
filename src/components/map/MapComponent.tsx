/* eslint-disable @typescript-eslint/no-unused-vars */
import { height } from "@mui/system";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";
import "./Map.css";

const center = {
	lat: 54.730012,
	lng: 25.262638,
};

const center2 = {
	lat: 25.262648,
	lng: 54.730012,
};

interface MapComponentProps {
	width: number;
}

const MapComponent = (props: MapComponentProps) => {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});

	const [map, setMap] = useState<google.maps.Map | null>(null);

	const onLoad = React.useCallback(function callback(map: google.maps.Map) {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(
		map: google.maps.Map
	) {
		setMap(null);
	},
	[]);

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}>
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					marginTop: "16px",
					marginBottom: "16px",
					marginRight: "32px",
				}}>
				{isLoaded ? (
					<GoogleMap
						mapContainerStyle={{
							width: props.width,
							height: props.width * 1.5,
						}}
						center={center}
						zoom={10}
						onLoad={onLoad}
						onUnmount={onUnmount}>
						{/* <Marker position={center2} />
            <Marker position={center} /> */}
					</GoogleMap>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default MapComponent;
