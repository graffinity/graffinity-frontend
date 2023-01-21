/* eslint-disable @typescript-eslint/no-unused-vars */
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import MarkerData from "models/map/MarkerData";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePlacesAutocomplete from "use-places-autocomplete";
import "./Map.css";
import MapLocate from "./MapLocate";
import MarkerComponent from "./MarkerComponent";
import mapStyles from "./mapStyles";

interface MapComponentProps {
	width: number;
	height: number;
	markers: MarkerData[];
}

const maxWidthForDesktopView = 900;

const center = {
	lat: 54.69,
	lng: 25.28,
};

const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};

export const MapComponent = (props: MapComponentProps) => {
	const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
	const [libraries] = useState<
		("geometry" | "places" | "drawing" | "localContext" | "visualization")[]
	>(["places"]);

	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: apiKey,
		libraries: libraries,
		// authReferrerPolicy: "origin",
	});

	const { markers } = props;
	const navigate = useNavigate();

	// const [map, setMap] = useState<google.maps.Map | null>(null);
	const [activeMarker, setActiveMarker] = useState<MarkerData | null>(null);
	const [infoWindowElement, setInfoWindowElement] = useState<
		HTMLElement | undefined
	>();

	const mapRef = useRef<google.maps.Map | null>(null);
	let infoRef = useRef<any>();
	const clientRef = useRef<HTMLElement | null>(null);
	const imgContainerRef = useRef<HTMLDivElement | null>(null);

	const GoogleMapConfig = {
		key: apiKey,
		libraries: libraries,
	};

	// console.log("isLoaded: ", isLoaded);
	// console.log("loadError: ", loadError);

	const handleActiveMarker = (marker: MarkerData) => {
		setActiveMarker(marker);
		if (mapRef.current) {
			mapRef.current.panTo(marker.position);
			mapRef.current.setZoom(16);
		}
	};

	const handleActiveMarkerNull = () => {
		setActiveMarker(null);
	};

	const handleSetInfoWindowElement = (element: HTMLElement) => {
		setInfoWindowElement(element);
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
		// setMap(null);
	}, []);

	const onMapLoad = useCallback(
		(map: google.maps.Map) => {
			mapRef.current = map;
			map.setZoom(12);
			// setMap(map);
			init();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const panTo = useCallback(
		(coords: google.maps.LatLngLiteral, zoom?: number) => {
			if (mapRef.current) {
				mapRef.current?.panTo(coords);
				mapRef.current?.setZoom(zoom ? zoom : 14);
				// setMap(mapRef.current);
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
			{/* <MapSearch panTo={panTo} /> */}
			<MapLocate panTo={panTo} />

			{isLoaded && (
				<GoogleMap
					mapContainerClassName="map"
					mapContainerStyle={{
						width:
							props.width > maxWidthForDesktopView
								? `calc(${props.width}px /1.3)`
								: "100%",
						// width: "100%",

						// width:
						// 	props.width > maxWidthForDesktopView
						// 		? `calc(${props.width}px /2)`
						// 		: "100%",
						height: props.height * 1.7,
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
							activeMarker={activeMarker}
							infoRef={infoRef}
							clientRef={clientRef}
							imgContainerRef={imgContainerRef}
							handleActiveMarker={handleActiveMarker}
							handleActiveMarkerNull={handleActiveMarkerNull}
							handleSetInfoWindowElement={handleSetInfoWindowElement}
						/>
					))}
				</GoogleMap>
			)}
		</div>
	);
};

export default MapComponent;
