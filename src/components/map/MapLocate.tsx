import { IconButton } from "@mui/material";
import { ReactComponent as CompassIcon } from "assets/svg/compass.svg";

interface MapLocateProps {
	panTo: (coords: google.maps.LatLngLiteral) => void;
}

const MapLocate = (props: MapLocateProps) => {
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
};

export default MapLocate;
