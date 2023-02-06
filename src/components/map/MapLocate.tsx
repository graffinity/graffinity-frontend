import { ExploreOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import "./Map.css";
import { useAppSelector } from "redux/store/hooks";
import common from "redux/common";
import { LocationAccessStatus } from "redux/store/common/CommonState";
interface MapLocateProps {
	panTo: (coords: google.maps.LatLngLiteral) => void;
}

const MapLocate = (props: MapLocateProps) => {
	const { panTo } = props;

	const userLocation = useAppSelector((state) => state.common.userLocation);
	const locationAccessStatus = useAppSelector(
		(state) => state.common.locationAccessStatus
	);

	const handleClick = () => {
		if (userLocation) {
			let coords = {
				lat: userLocation.latitude,
				lng: userLocation.longitude,
			};
			panTo(coords);
		} else {
			common.getUserLocation();
		}
		console.log("LocationAccessStatus:", locationAccessStatus);
	};

	return (
		<Tooltip
			title={
				locationAccessStatus === LocationAccessStatus.DENIED
					? "Enable location access to locate me"
					: "Locate me"
			}
		>
			<IconButton
				className="locate hover-icon-effect"
				disableTouchRipple={
					locationAccessStatus === LocationAccessStatus.DENIED
				}
				onClick={() =>
					locationAccessStatus !== LocationAccessStatus.DENIED
						? handleClick()
						: () => {}
				}
			>
				<ExploreOutlined
					className="base-icon"
					sx={{
						":hover": {
							cursor:
								locationAccessStatus !== LocationAccessStatus.DENIED
									? "pointer"
									: "not-allowed",
							color:
								locationAccessStatus !== LocationAccessStatus.DENIED
									? "#000000"
									: "rgba(229, 57, 53, 0.55) !important",

							boxShadow:
								locationAccessStatus !== LocationAccessStatus.DENIED
									? "0 0 0 10px rgba(0, 0, 0, 0.4) !important"
									: "0 0 0 10px rgba(229, 57, 53, 0.4) !important",
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
		</Tooltip>
	);
};

export default MapLocate;
