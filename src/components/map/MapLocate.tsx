import { ExploreOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import "./Map.css";
interface MapLocateProps {
	panTo: (coords: google.maps.LatLngLiteral) => void;
}

const MapLocate = (props: MapLocateProps) => {
	const { panTo } = props;
	return (
		<IconButton
			className="locate hover-icon-effect"
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
			<ExploreOutlined
				className="base-icon"
				sx={{
					":hover": {
						boxShadow: "0 0 0 10px rgba(0, 0, 0, 0.4) !important",
					},
				}}
				style={{
					width: "48px",
					height: "48px",
					color: "#000000",
					opacity: "0.7",
				}}
			/>
		</IconButton>
	);
};

export default MapLocate;
