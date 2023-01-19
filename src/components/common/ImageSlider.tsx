import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AppTheme from "AppTheme";
import GraffitiPostAPI from "api/GraffitiPostAPI";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Common.css";

interface PhotoObject {
	label: string;
	imgPath: string;
}

const TextMobileStepper = () => {
	const { id } = useParams();

	const [activeStep, setActiveStep] = useState<number>(0);

	const [photos, setPhotos] = useState<PhotoObject[]>([]);

	useEffect(() => {
		console.log("graffitiId", id);
		getGraffiti();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getGraffiti = async () => {
		if (id) {
			let response = await GraffitiPostAPI.findById(+id);
			await getGraffitiPhotos(response);
		}
	};

	const getGraffitiPhotos = async (graffiti: GraffitiResponse) => {
		if (graffiti) {
			let photos = graffiti.photos.map(async (photo) => {
				let blobPath = await fetch(photo.url, {
					headers: {
						"Allow-Control-Allow-Origin": "*",
						append: "to",
						"Access-Control-Allow-Headers": "*",
						"Access-Control-Allow-Methods": "*",
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Expose-Headers": "*",
						"Access-Control-Max-Age": "*",
						"Access-Control-Request-Headers": "*",
						"Access-Control-Request-Method": "*",
						"Access-Control-Request-Origin": "*",
						"Access-Control-Request-URL": "*",
					},
					mode: "cors",
				}).then((res) => res.blob());
				let photoObject = {
					label: graffiti.name,
					imgPath: URL.createObjectURL(blobPath),
				};

				return photoObject;
			});
			let res: PhotoObject[] = await Promise.all(photos).then((values) => {
				return values;
			});
			setPhotos(res);
			return res;
		}
		setPhotos([]);
		return [];
	};

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
						{photos && photos.length > 0 && photos[activeStep].label}
					</Typography>
				</Paper>
				<Box
					component={"img"}
					src={photos && photos.length > 0 ? photos[activeStep].imgPath : ""}
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
