/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
import {
	GoogleMap,
	InfoWindow,
	Marker,
	useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useRef, useState } from "react";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";

import { IconButton } from "@mui/material";
// import { formatRelative } from "date-fns";
import { ReactComponent as CompassIcon } from "assets/svg/compass.svg";
import "./Map.css";
import mapStyles from "./mapStyles";

interface MarkerData {
	lat: number;
	lng: number;
	time: Date;
}

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
}

const maxWidthForDesktopView = 900;

export default function MapComponent(props: MapComponentProps) {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries: ["places"],
	});

	const [markers, setMarkers] = useState<MarkerData[]>([]);
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [selected, setSelected] = useState<MarkerData | null>(null);
	const mapRef = useRef<google.maps.Map | null>(null);

	const onUnmount = useCallback(function callback(map: google.maps.Map) {
		setMap(null);
	}, []);
	const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
		if (event.latLng) {
			let newMarker: MarkerData = {
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
				time: new Date(),
			};
			setMarkers((previous) => [...previous, newMarker]);
		}
	}, []);

	const onMapLoad = useCallback((map: google.maps.Map) => {
		mapRef.current = map;
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	const panTo = useCallback((coords: google.maps.LatLngLiteral) => {
		if (mapRef.current) {
			mapRef.current?.panTo(coords);
			mapRef.current?.setZoom(18);
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
					onClick={onMapClick}
					onLoad={onMapLoad}
					onUnmount={onUnmount}
				>
					{markers.map((marker) => (
						<Marker
							key={marker.time.toISOString()}
							position={{
								lat: marker.lat,
								lng: marker.lng,
							}}
							// icon={{
							// 	url: './location.svg',
							// 	origin: new window.google.maps.Point(0, 0),
							// 	anchor: new window.google.maps.Point(15, 15),
							// 	scaledSize: new window.google.maps.Size(30, 30),
							// }}
							onClick={() => {
								setSelected(marker);
							}}
						/>
					))}
					{selected && (
						<InfoWindow
							position={{
								lat: selected.lat,
								lng: selected.lng,
							}}
							onCloseClick={() => {
								setSelected(null);
							}}
						>
							<div>
								<p>Graffiti spotted watch out !</p>
								{/* <p>Spotted {formatRelative(selected.time, new Date())}</p> */}
							</div>
						</InfoWindow>
					)}
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
	return <div>search</div>;

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
