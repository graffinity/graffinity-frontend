/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconButton } from "@mui/material";
import {
	GoogleMap,
	InfoWindow,
	Marker,
	useJsApiLoader,
} from "@react-google-maps/api";
import { ReactComponent as CompassIcon } from "assets/svg/compass.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import { ReactComponent as location } from "assets/svg/location.svg";
import "./Map.css";
import mapStyles from "./mapStyles";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { MarkerData } from "pages/home/HomePage";

// interface MarkerData {
// 	lat: number;
// 	lng: number;
// 	time: Date;
// }

const center = {
	lat: 54.6872,
	lng: 25.2797,
};
const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};
interface MapComponentProps {
	width: number;
	height: number | null;
	graffitis: GraffitiResponse[];
	markers: MarkerData[];
}

const maxWidthForDesktopView = 900;
// const markers = [
// 	{
// 		id: 1,
// 		name: "PLZ, WORK",
// 		position: { lat: 54.687431, lng: 25.281231 },
// 		image: "src/assets/images/testPic.jpg",
// 		// ../../assets/images/testPic.jpg
// 	},
// ];

export default function MapComponent(props: MapComponentProps) {
	const { graffitis, markers } = props;

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries: ["places"],
	});

	// const [markers, setMarkers] = useState<MarkerData[]>([]);
	const [map, setMap] = useState<google.maps.Map | null>(null);
	// const [selected, setSelected] = useState<MarkerData | null>(null);
	const mapRef = useRef<google.maps.Map | null>(null);
	const [selectedMarker, setSelectedMarker] = useState("");
	const [isLol, setIsLol] = useState(false);

	const [activeMarker, setActiveMarker] = useState(null);

	const handleActiveMarker = (marker: any) => {
		if (marker === activeMarker) {
			return;
		}
		setActiveMarker(marker);
	};

	useEffect(() => {
		console.log("Markers", markers);
	}, [markers]);

	const onUnmount = useCallback(function callback(map: google.maps.Map) {
		setMap(null);
	}, []);
	// const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
	// 	if (event.latLng) {
	// 		let newMarker: MarkerData = {
	// 			lat: event.latLng.lat(),
	// 			lng: event.latLng.lng(),
	// 			time: new Date(),
	// 		};
	// 		setMarkers((previous) => [...previous, newMarker]);
	// 	}
	// }, []);

	const onMapLoad = useCallback(
		(map: google.maps.Map) => {
			mapRef.current = map;
			const bounds = new window.google.maps.LatLngBounds(center);
			map.fitBounds(bounds);
			setMap(map);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const panTo = useCallback((coords: google.maps.LatLngLiteral) => {
		if (mapRef.current) {
			mapRef.current?.panTo(coords);
			mapRef.current?.setZoom(16);
			setMap(mapRef.current);
		}
	}, []);

	return (
		<div
			className="map-container"
			style={{
				width: "100%",
				flex: 1,
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Search panTo={panTo} />
			<Locate panTo={panTo} />

			{isLoaded && (
				<GoogleMap
					mapContainerClassName="map"
					mapContainerStyle={{
						width:
							props.width > maxWidthForDesktopView
								? `calc(${props.width}px /2)`
								: "100%",
						height: props.height ? props.height : "80%",
					}}
					center={center}
					options={options}
					// onClick={onMapClick}
					onLoad={onMapLoad}
					onUnmount={onUnmount}
					onClick={() => setActiveMarker(null)}
				>
					{markers.map((marker) => (
						<Marker
							key={marker.id}
							position={marker.position}
							onClick={() => handleActiveMarker(marker.id)}
						>
							{activeMarker === marker.id ? (
								<InfoWindow onCloseClick={() => setActiveMarker(null)}>
									<>
										<div>{marker.name}</div>
										<img
											src={require("../../assets/images/testPic.jpg")}
											width="250"
											height="250"
										/>
									</>
								</InfoWindow>
							) : null}
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
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			// location: { lat: () => 43.6532, lng: () => -79.3832 },
			radius: 100 * 1000,
		},
	});

	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

	const handleInput = (e: { target: { value: string } }) => {
		setValue(e.target.value);
	};

	const handleSelect = async (address: string) => {
		setValue(address, false);
		clearSuggestions();

		try {
			let results = await getGeocode({ address });
			let coords = getLatLng(results[0]);
			panTo(coords);
		} catch (error) {
			console.log("😱 Error: ", error);
		}
	};
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
function setEffect(arg0: () => void, arg1: never[]) {
	throw new Error("Function not implemented.");
}
