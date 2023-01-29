import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import AppTheme from "AppTheme";
import FavouriteButton from "components/buttons/FavouriteButton";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useState } from "react";
import "./ImageComponents.css";
import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";
import { useAppSelector } from "redux/store/hooks";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PopUPComponent from "pages/GraffitiFullView/GraffittiUploadPopUp";

interface ImageSliderProps {
	graffiti: GraffitiResponse;
}

const ImageSlider = (props: ImageSliderProps) => {
	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);
	const { graffiti } = props;
	const [activeStep, setActiveStep] = useState<number>(0);
	const [likeCount, setLikeCount] = useState<number>(0);
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [popUp, setPopUp] = useState<boolean>(false);
	useEffect(() => {
		getLikeCount();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getLikeCount();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeStep]);
	useEffect(() => {
		getLikeCount();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn]);

	const getLikeCount = async () => {
		let photoId = graffiti.photos[activeStep].id;
		let likeCount = await GraffitiPhotoAPI.getLikeCount(photoId);
		if (isLoggedIn) {
			let isLiked = await GraffitiPhotoAPI.isLikedByUser(photoId);
			setIsLiked(isLiked);
		}

		setLikeCount(likeCount);
	};

	const handlePhotoLike = async () => {
		if (isLiked) {
			let response = await GraffitiPhotoAPI.unlikePhoto(
				graffiti.photos[activeStep].id
			);
			let likeCount = response.likes.length;
			setLikeCount(likeCount);
			setIsLiked(false);
		} else {
			let response = await GraffitiPhotoAPI.likePhoto(
				graffiti.photos[activeStep].id
			);
			let likeCount = response.likes.length;
			setLikeCount(likeCount);
			setIsLiked(true);
		}
	};

	function handleDialogOpen() {
		setPopUp(true);
	}
	function handleDialogClose() {
		setPopUp(false);
	}
	const handleClick = () => {
		handlePhotoLike();
	};

	const maxSteps = graffiti.photos.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<div
			className="ImageSlider"
			style={{ margin: "0", width: "100%", minWidth: "360px" }}
		>
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
				<Tooltip
					title={
						isLoggedIn
							? ""
							: "Please log in to like this graffiti and / or upload more pictures of it "
					}
					style={{
						width: "100%",
					}}
					placement="bottom-end"
				>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							zIndex: 99,
							padding: "8px",
							paddingTop: "16px",
							marginBottom: "-58px",
							boxSizing: "border-box",
							width: "100%",
							alignContent: "center",
							alignItems: "center",
						}}
					>
						<FavouriteButton
							likeCount={likeCount}
							handleClick={handleClick}
							isLiked={isLiked}
							disabled={!isLoggedIn}
						/>
						<MoreHorizOutlinedIcon
							onClick={isLoggedIn ? handleDialogOpen : undefined}
							style={{
								zIndex: 99,
								margin: "0",
							}}
						/>
						<PopUPComponent onClose={handleDialogClose} open={popUp} />
					</div>
				</Tooltip>

				<Box
					component={"img"}
					alt="Graffiti"
					src={graffiti && maxSteps > 0 ? graffiti.photos[activeStep].url : ""}
					style={{
						display: "flex",
						width: "100%",
						borderRadius: "16px",
						justifyContent: "center",
						alignContent: "center",
						objectFit: "cover",
						overflowBlock: "hidden",
						maxHeight: "1280px",
						maxWidth: "1280px",
						aspectRatio: 1 / 1,
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
					variant="progress"
					steps={graffiti ? maxSteps : 0}
					position="static"
					color="white"
					activeStep={activeStep}
					LinearProgressProps={{
						style: {
							visibility: maxSteps > 1 ? "visible" : "hidden",
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
							disabled={!graffiti || activeStep === maxSteps - 1}
							style={{
								display: "flex",
								backgroundColor: "white",
								padding: "8px 4px 8px 12px",
								borderRadius: "4px",
								visibility: maxSteps > 1 ? "visible" : "hidden",
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
								visibility: maxSteps > 1 ? "visible" : "hidden",
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
