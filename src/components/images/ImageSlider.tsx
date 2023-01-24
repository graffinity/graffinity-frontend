import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AppTheme from "AppTheme";
import GraffitiAPI from "api/GraffitiPostAPI";
import GraffitiPhotoResponse from "models/graffitiphoto/GraffitiPhotoResponse";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ImageComponents.css";

const TextMobileStepper = () => {
	const { id } = useParams();

	const [activeStep, setActiveStep] = useState<number>(0);

	const [photos, setPhotos] = useState<GraffitiPhotoResponse[]>([]);

	useEffect(() => {
		console.log("graffitiId", id);
		getGraffiti();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getGraffiti = async () => {
		if (id) {
			let response = await GraffitiAPI.findById(+id);
			setPhotos(response.photos);
		}
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<div className="ImageSlider"
			style={{ margin: '0' }}>
			<Box sx={{ maxHeight: "100vw" }}>
				<Paper
					square
					elevation={0}
					sx={{
						display: "flex",
						alignItems: "center",
						height: 50,
						pl: 2,
						bgcolor: "transparent",
					}}
				>
					<Typography sx={{ color: "white" }}>
						{photos && photos.length > 0 && photos[activeStep].url}
					</Typography>
				</Paper>
				<Box
					component={"img"}
					src={photos && photos.length > 0 ? photos[activeStep].url : ""}
					sx={{
						width: "100vh",
						maxHeight: "600px",
						display: "flex",
						p: 2,
						justifyContent: "center",
						alignContent: "center",
						ml: 0,
						mr: 0,
						padding: 0,
						paddingTop: "16px",
						paddingBottom: "16px",
					}}
				></Box>
				<MobileStepper
					sx={{
						backgroundColor: "transparent",
					}}
					variant="dots"
					steps={photos.length}
					position="static"
					activeStep={activeStep}
					nextButton={
						<Button
							size="small"
							onClick={handleNext}
							disabled={activeStep === photos.length - 1}
							sx={{ color: "white" }}
						>
							Next
							{AppTheme.direction === "rtl" ? (
								<KeyboardArrowLeft />
							) : (
								<KeyboardArrowRight />
							)}
						</Button>
					}
					backButton={
						<Button
							size="small"
							onClick={handleBack}
							disabled={activeStep === 0}
							sx={{ color: "white" }}
						>
							{AppTheme.direction === "rtl" ? (
								<KeyboardArrowRight />
							) : (
								<KeyboardArrowLeft />
							)}
							Back
						</Button>
					}
				/>
			</Box>
		</div>
	);
};

export default TextMobileStepper;
