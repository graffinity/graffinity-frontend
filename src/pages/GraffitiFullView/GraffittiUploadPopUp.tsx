import { Button, CircularProgress, Dialog, Typography } from "@mui/material";
import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";
import UploadIconButton from "components/buttons/UploadIconButton";
import UploadedImageComponent from "components/common/UploadedImageComponent";
import { useEffect, useState } from "react";

interface UploadDialogProps {
	status: {
		open: boolean;
		images: File[];
	};

	graffitiId: number;
	handleClose: () => void;
}

// Previously, this was PopUpComponent declaration
export const UploadDialog = (props: UploadDialogProps) => {
	const { status, graffitiId, handleClose } = props;
	const [images, setImages] = useState<File[]>(status.images);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setImages(status.images);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);

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
					graffitiId,
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

	const handleSubmit = async () => {
		setIsLoading(true);
		await addPhotosToGraffiti(images);
		setIsLoading(false);

		setImages([]);
		handleClose();
		setTimeout(() => {
			window.location.reload();
		}, 200);
	};

	const handleMultipleImagesUpload = (files1: FileList) => {
		if (images.length > 0) {
			let filesArray = Array.from(files1);
			if (filesArray.length > 3 || filesArray.length + images.length > 3) {
				alert("Can not upload more than 3 images at a time");
				return;
			}
			filesArray.forEach((file) => {
				let imageNames = images.map((image) => image.name);
				if (!imageNames.includes(file.name)) {
					setImages((prev) => [...prev, file]);
				}
			});
		}
	};

	const removeImage = (image: File) => {
		setImages((prev) => prev.filter((file) => file.name !== image.name));
	};

	return (
		<Dialog
			PaperProps={{
				style: {
					background: "#404044",
					borderRadius: "12px",
					width: "100%",
					padding: "24px",
					boxSizing: "border-box",
					display: "flex",
				},
			}}
			open={status.open}
			onClose={handleClose}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					width: "100%",
					justifyContent: "center",
				}}
			>
				{images.length <= 3 && (
					<UploadIconButton
						handleUpload={handleMultipleImagesUpload}
						disabled={images.length >= 3}
					/>
				)}
			</div>

			{images.length > 0 && (
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						width: "100%",
						padding: "16px",
						boxSizing: "border-box",
						height: "100%",
						gap: "16px",
					}}
				>
					{images.map((image, index) => (
						<UploadedImageComponent
							key={index}
							image={image}
							onRemove={removeImage}
						/>
					))}
				</div>
			)}

			{/* {isLoading && <CircularProgress />} */}

			<Button
				variant="contained"
				onClick={handleSubmit}
				style={{
					// background: "#202024",
					marginTop: "24px",
					width: "100%",
					textTransform: "none",
					padding: "8px",
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
		</Dialog>
	);
};

export default UploadDialog;
