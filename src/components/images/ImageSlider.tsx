import { AddCircleOutlined } from "@mui/icons-material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { IconButton, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import AppTheme from "AppTheme";
import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";
import DeleteIconButton from "components/buttons/DeleteIconButton";
import FavouriteButton from "components/buttons/FavouriteButton";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { UploadDialog } from "pages/GraffitiFullView/GraffittiUploadPopUp";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import common from "redux/common";
import { useAppSelector } from "redux/store/hooks";
import "./ImageComponents.css";

interface ImageSliderProps {
	graffiti: GraffitiResponse;
}

const ImageSlider = (props: ImageSliderProps) => {
	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);
	const user = useAppSelector((state) => state.common.userInfo);
	const { graffiti } = props;
	const [activeStep, setActiveStep] = useState<number>(0);
	const [likeCount, setLikeCount] = useState<number>(0);
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [popUpOpen, setPopUpOpen] = useState<{ open: boolean; images: File[] }>(
		{
			open: false,
			images: [],
		}
	);

	const hiddenInputRef = useRef<HTMLInputElement | null>(null);

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
		common.getStatus();
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

	function handleDialogOpen(images: FileList) {
		let status = {
			open: true,
			images: Array.from(images),
		};
		setPopUpOpen(status);
	}
	function handleDialogClose() {
		setPopUpOpen({
			open: false,
			images: [],
		});
	}
	const handleClick = () => {
		handlePhotoLike();
	};

	const maxSteps = graffiti.photos.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleInputClick = () => {
		hiddenInputRef.current?.click();
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			if (e.target.files.length > 1) {
			}
			let images = e.target.files;
			handleDialogOpen(images);
		}
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
					<div
						style={{
							display: "flex",
							justifyContent: "flex-start",
							zIndex: 99,
							width: "100%",
							marginBottom: "-18px",
							marginLeft: "8px",
						}}
					>
						{isLoggedIn &&
							user?.userId === graffiti.photos[activeStep].userId && (
								<DeleteIconButton graffitiPhoto={graffiti.photos[activeStep]} />
							)}
					</div>
					<Tooltip
						title={isLoggedIn ? "" : "Please log in to like this graffiti"}
						placement="top"
					>
						<div>
							<FavouriteButton
								likeCount={likeCount}
								handleClick={handleClick}
								isLiked={isLiked}
								disabled={!isLoggedIn}
							/>
						</div>
					</Tooltip>
					<div
						style={{
							marginTop: "-16px",
							marginBottom: "-32px",
						}}
					>
						<Tooltip
							title={
								isLoggedIn
									? "Add photos to this graffiti"
									: "Please log in upload a photo"
							}
							placement="bottom"
						>
							<IconButton
								className="hover-icon-effect"
								disableTouchRipple
								onClick={isLoggedIn ? () => handleInputClick() : () => {}}
								sx={{
									opacity: isLoggedIn ? 1 : 0.5,
									"&:hover": {
										cursor: isLoggedIn ? "normal" : "not-allowed",
										backgroundColor: "rgba(0, 0, 0, 0.2)",
									},
								}}
							>
								<AddCircleOutlined
									className="base-icon"
									style={{
										color: "#FFFFFF",
										opacity: isLoggedIn ? 1 : 0.5,
										height: "32px",
										width: "32px",
									}}
									sx={{
										"&:hover": {
											cursor: isLoggedIn ? "normal" : "not-allowed",
											boxShadow: isLoggedIn
												? "0 0 0 10px rgba(0, 0, 0, 0.4) !important"
												: "0 0 0 10px rgba(229, 57, 53, 0.4) !important",
											color: isLoggedIn
												? "#FFFFFF"
												: "rgba(229, 57, 53, 0.55) !important",
										},
									}}
								/>
							</IconButton>
						</Tooltip>
						<input
							alt="Upload Image"
							accept="image/*"
							type="file"
							multiple
							onChange={handleFileChange}
							ref={hiddenInputRef}
							style={{ display: "none" }}
						/>
					</div>
					<UploadDialog
						handleClose={handleDialogClose}
						graffitiId={graffiti.id}
						status={popUpOpen}
					/>
				</div>

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
