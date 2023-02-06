/* eslint-disable @typescript-eslint/no-unused-vars */
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { InfoWindow, Marker } from "@react-google-maps/api";
import AppTheme from "AppTheme";
import UploadIconButton from "components/buttons/UploadIconButton";
import MarkerData from "models/map/MarkerData";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Map.css";
import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";

interface MarkerComponentProps {
	marker: MarkerData;
	activeMarker: MarkerData | null;
	mapRef: React.MutableRefObject<google.maps.Map | null>;
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

	const photos = marker.photos.map((photo) => photo.url);
	const maxSteps = photos.length;
	const [currentImage, setCurrentImage] = useState<string>(photos[0]);
	const [activeStep, setActiveStep] = useState<number>(0);
	const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
		null
	);
	const [images, setImages] = useState<File[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [uploadDialogOpen, setUploadDialogOpen] = useState<{
		open: boolean;
		images: File[];
	}>({
		open: false,
		images: [],
	});

	const imageRef = useRef<HTMLImageElement | null>(null);

	const handleNext = () => {
		setCurrentImage(photos[activeStep + 1]);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setCurrentImage(photos[activeStep - 1]);
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setCurrentImage(photos[0]);
		setActiveStep(0);
	};

	const handleOpen = (files: FileList) => {
		setUploadDialogOpen({
			open: true,
			images: Array.from(files),
		});
	};

	const handleClose = () => {
		setUploadDialogOpen({
			open: false,
			images: [],
		});
	};

	const addPhotosToGraffiti = async (images: File[]) => {
		if (images.length <= 3) {
			let formData = new FormData();

			formData.append("image1", images[0]);
			if (images.length > 1 && images[1]) {
				formData.append("image2", images[1]);
			}
			if (images.length > 2 && images[2]) {
				formData.append("image3", images[2]);
			}
			try {
				let response = await GraffitiPhotoAPI.uploadMultiplePhotos(
					marker.id,
					formData
				);
				return response;
			} catch (error) {
				console.error(error);
				setIsLoading(false);
				handleClose();
				alert("Something went wrong");
				return error;
			}
		} else if (images.length === 0) {
			console.error("No files uploaded");
			alert("No files uploaded");
		} else {
			console.error("You can upload no more than 3 images at a time");
			alert("You can upload no more than 3 images at a time");
		}
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
					onLoad={(infoWindow) => {
						setInfoWindow(infoWindow);
					}}
					onCloseClick={() => {
						handleActiveMarkerNull();
					}}
					onUnmount={() => {
						handleActiveMarkerNull();
						handleReset();
					}}
				>
					<>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								width: "100%",
								aspectRatio: 1.2 / 1,
								margin: 0,
								objectFit: "contain",
								overflow: "hidden",
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
								{infoWindow && marker.photos.length !== 0 && (
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											width: "100%",
											height: undefined,
											aspectRatio: 1 / 1,
											overflow: "hidden",
											objectFit: "cover",
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
											<UploadIconButton
												handleUpload={(file: FileList) => console.log(file)}
											/>
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
												height={undefined}
												alt="GraffitiImage"
												ref={imageRef}
												src={currentImage}
												style={{
													width: "100%",
													objectFit: "cover",
													overflowBlock: "hidden",
													maxHeight: "720",
													maxWidth: "720",
													aspectRatio: 1.2 / 1,
												}}
												sx={{
													":hover": {
														zIndex: 1,
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
								)}
							</div>
						</div>
					</>
				</InfoWindow>
			)}
		</Marker>
	);
};

export default MarkerComponent;
