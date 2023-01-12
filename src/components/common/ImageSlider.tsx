import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import "./Common.css";

const images = [
	{
		label: "Lukiškės prison, Lithuania",
		imgPath:
			"https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9507.JPG",
	},
	{
		label: "Lukiškės prison, Lithuania",
		imgPath:
			"https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9506.JPG",
	},
	{
		label: "Lukiškės prison, Lithuania",
		imgPath:
			"https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9504.JPG ",
	},
	{
		label: "Lukiškės prison, Lithuania",
		imgPath:
			"https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9505.JPG",
	},
];

export default function TextMobileStepper() {
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = images.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<div className="ImageSlider">
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
						{images[activeStep].label}
					</Typography>
				</Paper>
				<Box
					component={"img"}
					src={images[activeStep].imgPath}
					sx={{
						width: "100vh",
						display: "flex",
						p: 2,
						justifyContent: "center",
						alignContent: "center",
						ml: 0,
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
					steps={maxSteps}
					position="static"
					activeStep={activeStep}
					nextButton={
						<Button
							size="small"
							onClick={handleNext}
							disabled={activeStep === maxSteps - 1}
							sx={{ color: "white" }}
						>
							Next
							{theme.direction === "rtl" ? (
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
							{theme.direction === "rtl" ? (
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
}
