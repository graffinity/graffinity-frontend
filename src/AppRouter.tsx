import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";
import "./AppRouter.css";
import BasicCard from "./components/common/Nav/Card";

import ResponsiveAppBar from "./components/common/Nav/Nav";
const containerStyle = {
	width: "800px",
	height: "600px",
};

const center = {
	lat: -3.745,
	lng: -38.523,
};

function App() {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyBuBPx0KmNq3e2VxxSnf07mHjBwE1lwlvA",
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
			<ResponsiveAppBar />
			<BasicCard />
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
				}}>
				{isLoaded ? (
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={center}
						zoom={10}
						onLoad={onLoad}
						onUnmount={onUnmount}>
						{/* Child components, such as markers, info windows, etc. */}
						<></>
					</GoogleMap>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
// return (
// <div
// 	style={{
// 		width: "100%",
// 		height: "100%",
// 		display: "flex",
// 		flexDirection: "column",
// 		marginTop: "140px",
// 	}}>
// 	<div
// 		style={{
// 			width: "100%",
// 			display: "flex",
// 			justifyContent: "center",
// 		}}>

// 		</div>
// 	{/* <ResponsiveAppBar />
// 	<BasicCard /> */}
// </div>
// 	);
// }

export default App;
