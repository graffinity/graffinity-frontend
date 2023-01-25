import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import AppTheme from "AppTheme";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useState } from "react";
import "./ImageComponents.css";

interface ImageSliderProps {
	graffiti: GraffitiResponse;
}

const ImageSlider = (props: ImageSliderProps) => {
	const { graffiti } = props;
	const [activeStep, setActiveStep] = useState<number>(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<div className="ImageSlider" style={{ margin: "0", width: "100%	" }}>
			<Box
				style={{
					display: "flex",
					flexDirection: "column",
					border: "1px solid #FFFFFF",
					borderRadius: "16px",
					alignItems: "center",
					marginTop: "48px",
					boxSizing: "border-box",
					width: "100%",
				}}
			>
				<Box
					component={"img"}
					alt="Graffiti"
					src={
						graffiti && graffiti.photos.length > 0
							? graffiti.photos[activeStep].url
							: ""
					}
					style={{
						display: "flex",
						width: "100%",
						borderRadius: "16px",
						justifyContent: "center",
						alignContent: "center",
					}}
				/>
				<MobileStepper
					style={{
						display: "flex",
						width: "100%",
						justifyContent: "space-between",
						backgroundColor: "transparent",
						position: "relative",
						padding: "16px",
						boxSizing: "border-box",
						marginTop: "-72px",
					}}
					// variant="dots"
					variant="progress"
					steps={graffiti ? graffiti.photos.length : 0}
					position="static"
					color="white"
					activeStep={activeStep}
					LinearProgressProps={{
						style: {
							backgroundColor: "white",
						},
					}}
					sx={{
						color: "white !important",
					}}
					nextButton={
						<Button
							sx={{
								":disabled": {
									opacity: 0.5,
								},
							}}
							onClick={handleNext}
							disabled={!graffiti || activeStep === graffiti.photos.length - 1}
							style={{
								display: "flex",
								backgroundColor: "white",
								padding: "8px 4px 8px 12px",
								borderRadius: "4px",
							}}
						>
							<Typography
								variant="h5"
								color={AppTheme.palette.text.primary}
								textTransform="none"
							>
								Next
							</Typography>
							{AppTheme.direction === "rtl" ? (
								<KeyboardArrowLeft
									style={{
										color: AppTheme.palette.text.primary,
										width: "24px",
									}}
								/>
							) : (
								<KeyboardArrowRight
									style={{
										color: AppTheme.palette.text.primary,
										width: "24px",
									}}
								/>
							)}
						</Button>
					}
					backButton={
						<Button
							sx={{
								":disabled": {
									opacity: 0.5,
								},
							}}
							onClick={handleBack}
							disabled={activeStep === 0}
							style={{
								display: "flex",
								backgroundColor: "white",
								padding: "8px 12px 8px 4px",
								borderRadius: "4px",
							}}
						>
							{AppTheme.direction === "rtl" ? (
								<KeyboardArrowRight
									style={{
										color: AppTheme.palette.text.primary,
										width: "24px",
									}}
								/>
							) : (
								<KeyboardArrowLeft
									style={{
										color: AppTheme.palette.text.primary,
										width: "24px",
									}}
								/>
							)}
							<Typography
								variant="h5"
								color={AppTheme.palette.text.primary}
								textTransform="none"
							>
								Back
							</Typography>
						</Button>
					}
				/>
			</Box>
		</div>
	);
};

export default ImageSlider;
