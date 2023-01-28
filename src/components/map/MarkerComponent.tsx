import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { InfoWindow, Marker } from "@react-google-maps/api";
import MarkerData from "models/map/MarkerData";
import { useRef, useState } from "react";
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

	const images = marker.photos.map((photo) => photo.url);
	const maxSteps = images.length;
	const [currentImage, setCurrentImage] = useState<string>(images[0]);
	const [activeStep, setActiveStep] = useState<number>(0);

	const imageRef = useRef<HTMLImageElement | null>(null);

	const handleNext = () => {
		setCurrentImage(images[activeStep + 1]);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setCurrentImage(images[activeStep - 1]);
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const navigate = useNavigate();
	return (
		<Marker
			key={marker.id}
			position={marker.position}
			onClick={() => handleActiveMarker(marker)}
		>
			{activeMarker?.id === marker.id && (
				<InfoWindow
					options={{
						maxWidth: imageRef.current?.clientWidth
							? imageRef.current?.clientWidth
							: undefined,
					}}
					ref={infoRef}
					onLoad={(infoWindow) => {
						let infoWindowElement = infoWindow.getContent() as HTMLElement;
						clientRef.current = infoWindowElement;
						infoWindow.setContent(infoWindowElement);
					}}
					onCloseClick={() => handleActiveMarkerNull()}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							width: "100%",
						}}
					>
						<IconButton onClick={handleBack} disabled={activeStep === 0}>
							<KeyboardArrowLeft />
						</IconButton>
						<div
							ref={imgContainerRef}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: "8px",
								// width: "100%",
								padding: "16px",
								height: undefined,
								aspectRatio: 1 / 1,
								// boxSizing: "border-box",
							}}
						>
							<Typography variant="body2">{marker.name}</Typography>
							{marker.photos.length !== 0 && (
								<img
									alt="GraffitiImage"
									ref={imageRef}
									src={currentImage}
									style={{
										maxWidth: "100%",
										// width: "min-content",
										// maxHeight: "350px",
										height: undefined,
										aspectRatio: 1 / 1,

										cursor: "pointer",
										opacity: "0.8",
									}}
									onClick={() => {
										navigate(`/graffiti/view/${marker.id}`);
									}}
								/>
							)}
						</div>
						<IconButton
							onClick={handleNext}
							disabled={activeStep === maxSteps - 1}
						>
							<KeyboardArrowRight />
						</IconButton>
					</div>
				</InfoWindow>
			)}
		</Marker>
	);
};

export default MarkerComponent;
