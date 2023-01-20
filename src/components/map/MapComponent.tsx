/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, IconButton, Typography } from "@mui/material";
import {
	GoogleMap,
	InfoWindow,
	Marker,
	useJsApiLoader,
} from "@react-google-maps/api";
import { ReactComponent as CompassIcon } from "assets/svg/compass.svg";
import { MarkerData } from "pages/home/HomePage";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePlacesAutocomplete from "use-places-autocomplete";
import "./Map.css";
import mapStyles from "./mapStyles";

const center = {
	lat: 54.69,
	lng: 25.28,
};
const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};
interface MapComponentProps {
	width: number;
	height: number;
	markers: MarkerData[];
}

const maxWidthForDesktopView = 900;

export default function MapComponent(props: MapComponentProps) {
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
			{/* <Search panTo={panTo} /> */}
			<Locate panTo={panTo} />

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
						<Marker
							key={marker.id}
							position={marker.position}
							onClick={() => handleActiveMarker(marker)}
						>
							{activeMarker?.id === marker.id && (
								// TODO: Dynamic InfoWindow height with mapRef and "maxHeight" useState hook
								<InfoWindow
									options={{}}
									ref={infoRef}
									onLoad={(infoWindow) => {
										let infoWindowElement =
											infoWindow.getContent() as HTMLElement;
										setInfoWindowElement(infoWindowElement);

										clientRef.current = infoWindowElement;

										infoWindow.focus();
										infoWindow.setContent(infoWindowElement);
									}}
									onCloseClick={() => setActiveMarker(null)}
								>
									<div
										ref={imgContainerRef}
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											gap: "8px",
											width: "100%",
											padding: "16px",
											boxSizing: "border-box",
										}}
									>
										<Typography variant="body2">{marker.name}</Typography>

										<Box
											component="img"
											src={marker.photos[0].url}
											style={{
												// maxWidth: "80%",
												maxWidth: "100%",
												maxHeight: "100%",
											}}
											sx={{ ":hover": { cursor: "pointer", opacity: "0.8" } }}
											onClick={() => {
												navigate(`/graffiti/view/${marker.id}`);
											}}
										/>
									</div>
								</InfoWindow>
								// </div>
							)}
						</Marker>
					))}
				</GoogleMap>
			)}
		</div>
	);
}

interface LocateAndSearchProps {
	panTo: (coords: google.maps.LatLngLiteral) => void;
}
function Locate(props: LocateAndSearchProps) {
	const { panTo } = props;
	return (
		<IconButton
			className="locate"
			onClick={() => {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						let coords: google.maps.LatLngLiteral = {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						};
						panTo(coords);
					},
					() => null
				);
			}}
		>
			<CompassIcon
				style={{
					width: "48px",
					height: "48px",
				}}
			/>
		</IconButton>
	);
}

function Search(props: LocateAndSearchProps) {
	const { panTo } = props;

	// const { init } = usePlacesAutocomplete({
	// 	initOnMount: false, // Disable initializing when the component mounts, default is true
	//   });

	// const {
	// 	ready,
	// 	value,
	// 	suggestions: { status, data },
	// 	setValue,
	// 	clearSuggestions,
	// } = usePlacesAutocomplete({
	// 	requestOptions: {
	// 		// location: { lat: () => 43.6532, lng: () => -79.3832 },
	// 		radius: 100 * 1000,
	// 	},
	// });

	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

	// const handleInput = (e: { target: { value: string } }) => {
	// 	setValue(e.target.value);
	// };

	// const handleSelect = async (address: string) => {
	// 	setValue(address, false);
	// 	clearSuggestions();

	// 	try {
	// 		let results = await getGeocode({ address });
	// 		let coords = getLatLng(results[0]);
	// 		panTo(coords);
	// 	} catch (error) {
	// 		console.log("😱 Error: ", error);
	// 	}
	// };
	return <div></div>;

	// return (
	// 	<div className='search'>
	// 		<Combobox onSelect={handleSelect}>
	// 			<ComboboxInput
	// 				value={value}
	// 				onChange={handleInput}
	// 				disabled={!ready}
	// 				placeholder='Search your location'
	// 			/>
	// 			<ComboboxPopover>
	// 				<ComboboxList>
	// 					{status === "OK" &&
	// 						data.map(({ id, description }) => (
	// 							<ComboboxOption key={id} value={description} />
	// 						))}
	// 				</ComboboxList>
	// 			</ComboboxPopover>
	// 		</Combobox>
	// 	</div>
	// );
}
