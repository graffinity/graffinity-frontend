import { CancelOutlined } from "@mui/icons-material";
import {
	Button,
	CircularProgress,
	IconButton,
	Typography,
} from "@mui/material";
import GraffitiAPI from "api/GraffitiAPI";
import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";
import UploadIconButton from "components/buttons/UploadIconButton";
import GalleryComponent from "components/gallery/GalleryComponent";
import NotLoggedInComponent from "components/login/NotLoggedInComponent";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "redux/store/hooks";

const AddPhotoToGraffitiPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

	const [graffiti, setGraffiti] = useState<GraffitiResponse | undefined>();
	const [images, setImages] = useState<File[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		console.log("graffitiId", id);
		getGraffiti();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getGraffiti = async () => {
		if (id) {
			let response = await GraffitiAPI.findById(+id);
			setGraffiti(response);
		}
		setGraffiti(undefined);
	};

	const addPhotosToGraffiti = async (images: File[]) => {
		if (images.length <= 3 && images.length > 0) {
			let formData = new FormData();

			formData.append("image1", images[0]);
			if (images.length > 1 && images[1]) {
				formData.append("image2", images[1]);
			}
			if (images.length > 2 && images[2]) {
				formData.append("image3", images[2]);
			}

			if (id) {
				try {
					let response = await GraffitiPhotoAPI.uploadMultiplePhotos(
						+id,
						formData
					);

					return response;
				} catch (error) {
					console.error(error);
					alert("Error while uploading photos");
					setIsLoading(false);
					return error;
				}
			}
		} else if (images.length === 0) {
			console.error("No files uploaded");
			alert("No files uploaded");
		} else {
			console.error("You can upload no more than 3 images at a time");
			alert("You can upload no more than 3 images at a time");
		}
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		await addPhotosToGraffiti(images);
		setIsLoading(false);
		setImages([]);
		setTimeout(() => {
			navigate(`/graffiti/view/${id}`);
		}, 200);
	};

	const handleMultipleImagesUpload = (files: FileList) => {
		if (files.length > 0) {
			let filesArray = Array.from(files);
			if (filesArray.length > 3 || filesArray.length + images.length > 3) {
				alert("Can not upload more than 3 images at a time");
				return;
			}
			filesArray.forEach((file) => {
				let filename = file.name;
				let imageFilenames = images.map((image) => image.name);
				if (!imageFilenames.includes(filename)) {
					setImages((prev) => [...prev, file]);
				}
			});
		} else {
			console.log("No files uploaded");
			alert("No files uploaded");
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				marginTop: "48px",
				padding: "42px",
				boxSizing: "border-box",
				width: "100%",
			}}
		>
			{isLoggedIn && (
				<>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							width: "100%",
							justifyContent: "center",
						}}
					>
						<UploadIconButton
							handleUpload={handleMultipleImagesUpload}
							disabled={images.length >= 3}
						/>
					</div>
					{images.length > 0 && (
						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								width: "50%",
								padding: "16px",
								boxSizing: "border-box",
								height: "100%",
								gap: "16px",
							}}
						>
							{images.map((image, index) => (
								<div
									key={index}
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
										alignItems: "center",
										boxSizing: "border-box",
										padding: "16px",
										border: "1px solid #fff",
										borderRadius: "8px",
										gap: "6px",
										width: "100%",
										maxWidth: "160px",
									}}
								>
									<div
										style={{
											display: "flex",
											alignItems: "flex-start",
										}}
									>
										<img
											src={URL.createObjectURL(image)}
											alt="uploaded"
											style={{
												width: "120px",
												height: "120px",
												opacity: "0.85",
											}}
										/>
										<IconButton
											style={{
												marginLeft: "-40px",
												padding: "8px",
											}}
											focusRipple
											onClick={() => {
												setImages(images.filter((i) => i !== image));
											}}
										>
											<CancelOutlined
												style={{
													color: "#FFFFFF",
												}}
											/>
										</IconButton>
									</div>
									<div
										style={{
											textOverflow: "ellipsis",
											overflow: "hidden",
											whiteSpace: "break-spaces",
											width: "100%",
										}}
									>
										<Typography
											variant="body2"
											color="#FFFFFF"
											noWrap={image.name.length > 20}
											style={{
												fontWeight: "600",
												padding: "4px",
												width: "100%",
												whiteSpace: "break-spaces",
											}}
										>
											{image.name}
										</Typography>
									</div>
								</div>
							))}
						</div>
					)}
					<Button
						variant="contained"
						onClick={handleSubmit}
						style={{
							color: "#000000",
							marginTop: "48px",
							width: "50%",
							textTransform: "none",
						}}
					>
						{!isLoading ? (
							<Typography
								variant="h5"
								color="#FFFFFF"
								style={{
									fontSize: "18px",
									lineHeight: "24px",
									fontWeight: "600",
								}}
							>
								Submit Photos
							</Typography>
						) : (
							<CircularProgress style={{ color: "#FFFFFF" }} />
						)}
					</Button>
					{graffiti && <GalleryComponent graffiti={graffiti} />}
				</>
			)}
			{!isLoggedIn && <NotLoggedInComponent />}
		</div>
	);
};

export default AddPhotoToGraffitiPage;
