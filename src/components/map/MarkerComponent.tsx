import { Box, Typography } from "@mui/material";
import { InfoWindow, Marker } from "@react-google-maps/api";
import MarkerData from "models/map/MarkerData";
import { useNavigate } from "react-router-dom";

interface MarkerComponentProps {
	marker: MarkerData;
	activeMarker: MarkerData | null;
	infoRef: React.MutableRefObject<any>;
	clientRef: React.MutableRefObject<HTMLElement | null>;
	imgContainerRef: React.MutableRefObject<HTMLDivElement | null>;
	handleActiveMarker: (marker: MarkerData) => void;
	handleActiveMarkerNull: () => void;
}

const MarkerComponent = (props: MarkerComponentProps) => {
	const {
		marker,
		activeMarker,
		infoRef,
		clientRef,
		imgContainerRef,
		handleActiveMarker,
		handleActiveMarkerNull,
	} = props;

	const navigate = useNavigate();
	return (
		<Marker
			key={marker.id}
			position={marker.position}
			onClick={() => handleActiveMarker(marker)}
		>
			{activeMarker?.id === marker.id && (
				<InfoWindow
					options={{}}
					ref={infoRef}
					onLoad={(infoWindow) => {
						let infoWindowElement = infoWindow.getContent() as HTMLElement;
						clientRef.current = infoWindowElement;
						infoWindow.setContent(infoWindowElement);
					}}
					onCloseClick={() => handleActiveMarkerNull()}
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
			)}
		</Marker>
	);
};

export default MarkerComponent;
