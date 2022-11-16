/* eslint-disable no-restricted-globals */
import {
	GoogleMap,
	InfoWindow,
	Marker,
	useJsApiLoader,
} from "@react-google-maps/api";
import React, { useState } from "react";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";

import { formatRelative } from "date-fns";
import "./Map.css";
import mapStyles from "./mapStyles";
import { ReactComponent as CompassIcon } from "./compass.svg";
import { ReactComponent as LocationIcon } from "./location.svg";

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

	const [markers, setMarkers] = React.useState<MarkerData[]>([]);
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [selected, setSelected] = React.useState<MarkerData | null>(null);
	const mapRef = React.useRef<google.maps.Map | null>(null);

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
	const onMapClick = React.useCallback((e) => {
		setMarkers((previous) => [
			...previous,
			{
				lat: e.latLng.lat(),
				lng: e.latLng.lng(),
				time: new Date(),
			},
		]);
	}, []);

	// const mapRef = React.useRef();
	const onMapLoad = React.useCallback((map: google.maps.Map) => {
		mapRef.current = map;
	}, []);

	const panTo = React.useCallback(({ lat, lng }) => {
		// if (mapRef.current) {
		// 	setMap(mapRef.current.panTo({ lat, lng }))
		// }
		mapRef.current?.panTo({ lat, lng });
		mapRef.current?.setZoom(18);
	}, []);

	return (
		<>
			<div
				className='map-container'
				style={{
					width: "100%",
					flex: 1,
					display: "flex",
					flexDirection: "column",
				}}>
				{/* <Search panTo={panTo} /> */}
				<Locate panTo={panTo} />
				<CompassIcon
					style={{
						width: "48px",
						height: "48px",
					}}
				/>
				{isLoaded ? (
					<>
						<GoogleMap
							mapContainerClassName='map'
							mapContainerStyle={{
								width:
									props.width > maxWidthForDesktopView
										? `calc(${props.width}px /2)`
										: "100%",
								// height: props.height ? props.height : "100%",
								height: props.height ? props.height : '20%',
							}}
							zoom={18}
							center={center}
							options={options}
							onClick={onMapClick}
							onLoad={onMapLoad}
							onUnmount={onUnmount}>
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
							{selected ? (
								<InfoWindow
									position={{
										lat: selected.lat,
										lng: selected.lng,
									}}
									onCloseClick={() => {
										setSelected(null);
									}}>
									<div>
										<p>Graffiti spotted watch out !</p>
										<p>
											Spotted{" "}
											{formatRelative(
												selected.time,
												new Date()
											)}
										</p>
									</div>
								</InfoWindow>
							) : null}
						</GoogleMap>
					</>
				) : (
					<></>
				)}
			</div>
		</>
	);
}
function Locate({ panTo }) {
	return (
		<button
			className='locate'
			onClick={() => {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						panTo({
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						});
					},
					() => null
				);
			}}></button>
	);
}

function Search({ panTo }) {
	// let newLocation: google.maps.LatLng = {

	// 	lat: () => 0,
	// 	lng: () => 0
	// }
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
			const results = await getGeocode({ address });
			const { lat, lng } = getLatLng(results[0]);
			panTo({ lat, lng });
		} catch (error) {
			console.log("😱 Error: ", error);
		}
	};

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
