/* eslint-disable @typescript-eslint/no-unused-vars */
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import googleDefaultConfig, { apiKey } from "constants/googleDefaultConfig";
import MarkerData from "models/map/MarkerData";
import { useCallback, useRef, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import mapStyles from "../../constants/mapStylesConstant";
import "./Map.css";
import MapLocate from "./MapLocate";
import MarkerComponent from "./MarkerComponent";
import { boxSizing } from "@mui/system";

interface MapComponentProps {
	width: number;
	height: number;
	markers: MarkerData[];
}

const maxWidthForDesktopView = 900;

export const MapComponent = (props: MapComponentProps) => {
	const { markers } = props;

	const { isLoaded } = useJsApiLoader({
		...googleDefaultConfig,
	});

	const [activeMarker, setActiveMarker] = useState<MarkerData | null>(null);

	const mapRef = useRef<google.maps.Map | null>(null);

	const handleActiveMarker = (marker: MarkerData) => {
		setActiveMarker(marker);
		if (mapRef.current) {
			mapRef.current.panTo(marker.position);
			mapRef.current.setCenter(marker.position);
			let currentZoom = mapRef.current.getZoom();
			if (currentZoom && currentZoom < 14) {
				mapRef.current.setZoom(14);
			}
		}
	};

	const handleActiveMarkerNull = () => {
		setActiveMarker(null);
	};

	const {
		init,
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		initOnMount: false,
		requestOptions: {
			// location: { lat: () => 43.6532, lng: () => -79.3832 },
			radius: 100 * 1000,
		},
	});

	const onUnmount = useCallback(function callback(map: google.maps.Map) {
		mapRef.current = null;
	}, []);

	const onMapLoad = useCallback(
		(map: google.maps.Map) => {
			mapRef.current = map;
			map.setZoom(12);
			init();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const panTo = useCallback(
		(coords: google.maps.LatLngLiteral, zoom?: number) => {
			if (mapRef.current) {
				mapRef.current?.panTo(coords);
				mapRef.current?.setZoom(zoom ? zoom : 15);
			}
		},
		[]
	);

	return (
		<div
			className="map-container"
			style={{
				flex: 1,
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					width: "100%",
					padding: "24px",
					boxSizing: "border-box",
					marginBottom: "-96px",
				}}
			>
				<MapLocate panTo={panTo} />
			</div>
			{/* <Search panTo={panTo} /> */}
			{isLoaded && (
				<GoogleMap
					key={apiKey}
					mapContainerClassName="map"
					mapContainerStyle={{
						width:
							props.width > maxWidthForDesktopView
								? `calc(${props.width}px /1.15)`
								: "100%",
						height: props.height * 0.9,
						borderRadius: "10px",
					}}
					center={center}
					options={options}
					onLoad={onMapLoad}
					onUnmount={onUnmount}
					onClick={() => setActiveMarker(null)}
				>
					{markers.map((marker) => (
						<MarkerComponent
							key={marker.id}
							marker={marker}
							mapRef={mapRef}
							activeMarker={activeMarker}
							handleActiveMarker={handleActiveMarker}
							handleActiveMarkerNull={handleActiveMarkerNull}
						/>
					))}
				</GoogleMap>
			)}
		</div>
	);
};

export default MapComponent;

const center = {
	lat: 54.69,
	lng: 25.28,
};

const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};
