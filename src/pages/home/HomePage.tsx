/* eslint-disable @typescript-eslint/no-unused-vars */
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import MultiActionAreaCard from "components/common/Card";
import Header from "components/common/Header";
import ResponsiveAppBar from "components/common/Header";
import { useCallback, useState } from "react";
import Map from "components/Map/Map";
import { FooterContainer } from "Containers/footerContainer";

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
			<div className='bg-primary'>
				<div className='row g-0 bg-transparent '>
					<div className='col bg-transparent d-flex justify-content-center '>
						<div className='leftSide'>
							<MultiActionAreaCard />
						</div>
					</div>

					<div className='col d-flex justify-content-center align-items-center '>
						<div className='rightSide'>
							{/* <Map /> */}
						</div>
					</div>
				</div>
				<FooterContainer />
			</div>
		</div>
	);
};

export default HomePage;
