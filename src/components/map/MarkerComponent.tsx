import {
	AddCircleOutlined,
	KeyboardArrowLeft,
	KeyboardArrowRight,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { InfoWindow, Marker } from "@react-google-maps/api";
import AppTheme from "AppTheme";
import MarkerData from "models/map/MarkerData";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Map.css";

interface MarkerComponentProps {
	marker: MarkerData;
	activeMarker: MarkerData | null;
	handleActiveMarker: (marker: MarkerData) => void;
	handleActiveMarkerNull: () => void;
}

const MarkerComponent = (props: MarkerComponentProps) => {
	const {
		marker,
		activeMarker,

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

	const handleReset = () => {
		setCurrentImage(images[0]);
		setActiveStep(0);
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
					onCloseClick={() => {
						handleActiveMarkerNull();
					}}
					onUnmount={() => {
						handleActiveMarkerNull();
						handleReset();
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							width: "100%",
							aspectRatio: 1 / 1,
							margin: 0,
							objectFit: "contain",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								width: "100%",
								padding: "16px",
								height: undefined,
								aspectRatio: 1 / 1,
								boxSizing: "border-box",
							}}
						>
							<Typography
								sx={{
									alignSelf: "center",
								}}
								variant="h2"
								color={AppTheme.palette.text.primary}
							>
								{marker.name}
							</Typography>
							<Divider
								style={{
									width: "100%",
									marginBottom: "16px",
								}}
								variant="fullWidth"
							/>
							{marker.photos.length !== 0 && (
								<>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											width: "100%",
											height: undefined,
											aspectRatio: 1 / 1,
											overflow: "hidden",
										}}
									>
										<div
											style={{
												display: "flex",
												justifyContent: "flex-end",
												marginBottom: "-64px",
												padding: "8px",
												width: "calc(100% - 16px)",
												zIndex: 999,
											}}
										>
											<IconButton className="hover-icon-effect">
												<AddCircleOutlined
													className="base-icon"
													style={{
														color: "#FFFFFF",
														height: "32px",
														width: "32px",
													}}
												/>
											</IconButton>
										</div>

										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<IconButton
												onClick={handleBack}
												disabled={activeStep === 0}
												disableTouchRipple
												className="hover-icon-effect"
												style={{
													marginRight: "-52px",
													marginBottom: "48px",
													zIndex: 99,
												}}
												sx={{
													"&:hover": {
														backgroundColor: "transparent",
													},
												}}
											>
												<KeyboardArrowLeft
													className="base-icon"
													style={{
														color: activeStep > 0 ? "#FFFFFF" : "transparent",
														height: "32px",
														width: "32px",
													}}
												/>
											</IconButton>
											<Box
												component={"img"}
												width="100%"
												height={undefined}
												alt="GraffitiImage"
												ref={imageRef}
												src={currentImage}
												style={{
													width: "100%",
													objectFit: "cover",
													overflowBlock: "hidden",
													maxHeight: "1280px",
													maxWidth: "1280px",
													aspectRatio: 1 / 1,
												}}
												sx={{
													":hover": {
														zIndex: 1,
														opacity: 0.97,
														cursor: "pointer",
														justifySelf: "center",
														alignSelf: "center",
													},
												}}
												onClick={() => {
													navigate(`/graffiti/view/${marker.id}`);
												}}
											/>
											<IconButton
												onClick={handleNext}
												className="hover-icon-effect"
												disableTouchRipple
												disabled={activeStep === maxSteps - 1}
												sx={{
													":hover": {
														backgroundColor: "transparent",
													},
												}}
												style={{
													marginLeft: "-52px",
													marginBottom: "48px",
													zIndex: 99,
												}}
											>
												<KeyboardArrowRight
													className="base-icon"
													style={{
														color:
															activeStep < maxSteps - 1
																? "#FFFFFF"
																: "transparent",
														height: "32px",
														width: "32px",
													}}
												/>
											</IconButton>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</InfoWindow>
			)}
		</Marker>
	);
};

export default MarkerComponent;
