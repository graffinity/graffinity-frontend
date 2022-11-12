/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { blue } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { Marker } from "react-leaflet";
import './Map.css'
import { useElementSize } from 'usehooks-ts'


interface IMap {
	mapType: google.maps.MapTypeId,
	mapTypeControl?: boolean,
	width: number;
	height: number;

}
interface IMarker {
	address: string;
	latitude: number;
	longitude: number;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;
// let map: google.maps.Map, infoWindow: google.maps.InfoWindow;


const MapComponent: React.FC<IMap> = ({ mapType, mapTypeControl, width, height }) => {

	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<GoogleMap>();
	const [marker, setMarker] = useState<IMarker>();
	const [userLat, setUserLat] = useState(null);
	const [userLong, setUserLong] = useState(null);


	const startMap = (): void => {
		if (!map) {
			defaultMapStart();
		}
	}
	useEffect(startMap, [map]);

	const defaultMapStart = (): void => {
		const defaultAddress = new google.maps.LatLng(54.729730, 25.263570);
		const defaultSize = new google.maps.Size(width, height);
		initMap(18, defaultAddress, defaultSize);
	};
	const initEventListener = (): void => {
		if (map) {
			google.maps.event.addListener(map, 'click', function (e) {
				coordinateToAddress(e.latLng);
			})
		}
	};
	useEffect(initEventListener, [map]);

	const coordinateToAddress = async (coordinate: GoogleLatLng) => {

		const geocoder = new google.maps.Geocoder();
		await geocoder.geocode({ location: coordinate }, function (results, status) {
			if (status === 'OK') {
				console.log(results[0].formatted_address);
				console.log(coordinate.lat());
				console.log(coordinate.lng());
				setMarker({
					address: results[0].formatted_address,
					latitude: coordinate.lat(),
					longitude: coordinate.lng(),
				})
			}
		});
	};
	const addSingleMarker = (): void => {
		if (marker) {
			addMarker(new google.maps.LatLng(marker.latitude, marker.longitude));
		}
	};
	useEffect(addSingleMarker, [marker]);

	const addMarker = (location: GoogleLatLng): void => {
		const marker: GoogleMarker = new google.maps.Marker({
			position: location,
			map: map,
			icon: getIconAttributes('#6B8E23')
		});
	};

	const getIconAttributes = (iconColor: string) => {
		return {
			fillColor: iconColor,
			strokeColor: iconColor,
			path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
			scale: 3,
			map: map,
		};
	};

	const initMap = (zoomLevel: number, address: any, defaultSize: any): void => {
		if (ref.current) {
			setMap(
				new google.maps.Map(ref.current, {
					zoom: zoomLevel,
					center: address,
					mapTypeControl: mapTypeControl,
					zoomControl: true,
					mapTypeId: mapType,
					panControl: true,
					scaleControl: true,
					gestureHandling: 'cooperative',
					draggableCursor: 'pointer',
				}));

		}
	};
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {
			setUserLat(position.coords.latitude);
			setUserLong(position.coords.longitude);
			console.log(userLat, userLong);
		})
	}, []);


	let MarkerOptions = {
		position: new google.maps.LatLng(54.729730, 25.263570),
		map: map,
		fillColor: "#6B8E23",
		strokeColor: "#6B8E23",
		path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
		scale: 3,

	}
	const StaticMarker: GoogleMarker = new google.maps.Marker(MarkerOptions)

	useEffect(initEventListener, [map]);
	return (
		<div className="map-container" >
			<div ref={ref}
				className="map">
			</div>
			<button onClick={() => map.panTo({ lat: userLat, lng: userLong })}>Pan Location</button>
		</div >
	);
};
export default MapComponent;