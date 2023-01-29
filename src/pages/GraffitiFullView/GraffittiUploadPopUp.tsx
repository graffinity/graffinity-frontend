import {
	Button,
	Dialog,
	DialogProps,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useState } from "react";
import React from "react";
import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import GraffitiAPI from "api/GraffitiAPI";
import GalleryComponent from "components/gallery/GalleryComponent";
import { CloseOutlined } from "@mui/icons-material";
import UploadIconButton from "components/buttons/UploadIconButton";

interface popUpComponentProps extends DialogProps {}
const Styles = {
	color: "#ffffff",
};
const maxNumber = 6900000;

export default function PopUPComponent(props: popUpComponentProps) {
	const { id } = useParams();
	const [graffiti, setGraffiti] = useState<GraffitiResponse | undefined>();
	const [images, setImages] = useState<File[]>([]);

	const validationSchema = yup.object({
		file: yup
			.mixed()
			.nullable()
			.required("A file is required")
			.test(
				"fileSize",
				"File too large",
				(value) => value && value.size <= maxNumber
			),
	});

	const getGraffiti = async () => {
		if (id) {
			let response = await GraffitiAPI.findById(+id);
			setGraffiti(response);
		}
		setGraffiti(undefined);
	};

	const addPhotosToGraffiti = async (images: File[]) => {
		if (images.length <= 3 && images.length > 0) {
			let promises = images.map(async (file) => {
				let formData = new FormData();
				formData.append("file", file);
				if (id) {
					let response = await GraffitiPhotoAPI.addPhotoToGraffiti(
						+id,
						formData
					);

					console.log("response", response);
					return response;
				}
				return undefined;
			});

			let result = await Promise.all(promises);
			return result;
		} else {
			console.error("You can only add 1-3 images at a time");
		}
	};

	useEffect(() => {
		getGraffiti();
	}, []);

	const handleSubmit = async () => {
		let result = await addPhotosToGraffiti(images);
		console.log("result", result);
		setImages([]);
	};

	const handleImageUpload = (file: File) => {
		console.log("uploaded: ", file);

		file.arrayBuffer().then((buffer) => {
			let blob = new Blob([new Uint8Array(buffer)], { type: file.type });
			let urlCreator = window.URL || window.webkitURL;
			let imageUrl = urlCreator.createObjectURL(blob);
			console.log("imageUrl", imageUrl);

			console.log("blob", blob);
			setImages([...images, file]);
		});
	};

	return (
		<Dialog
			PaperProps={{
				style: {
					background: "#404044",
					width: "100vw",
				},
			}}
			open={props.open}
			onClose={props.onClose}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					padding: "24px",
					height: "100%",
					gap: "8px",
				}}
			>
				<div>
					<Typography
						color="common.white"
						sx={{
							mb: "12px",
							fontFamily: "Times, Times New Roman, serif",
						}}
					>
						Enter the name of the graffiti
					</Typography>
					<TextField
						id="outlined-multiline-flexible demo-helper-text-misaligned-
					no-helper"
						fullWidth
						multiline
						label="Name"
						variant="outlined"
						inputProps={{ style: { color: "white" } }}
						sx={{
							"& .MuiInputLabel-root": { color: "white" },
							"& .MuiFilledInput-input": {
								border: "1px solid white",
								borderRadius: 1,
							},
						}}
					/>
					<Typography
						color="common.white"
						sx={{
							mt: "12px",
							mb: "12px",
							fontFamily: "Times, Times New Roman, serif",
						}}
					>
						Enter a short description
					</Typography>
					<TextField
						id="outlined-multiline-flexible demo-helper-text-misaligned-
					no-helper"
						fullWidth
						multiline
						label="Description"
						variant="outlined"
						inputProps={{ style: { color: "white" } }}
						sx={{
							"& .MuiInputLabel-root": { color: "white" },
							"& .MuiFilledInput-input": {
								border: "1px solid white",
								borderRadius: 1,
							},
						}}
					/>
					<>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								width: "100%",
								margin: "20px",
							}}
						>
							<UploadIconButton handleUpload={handleImageUpload} />
						</div>
						{images.length > 0 && (
							<div
								style={{
									display: "flex",
									flexWrap: "wrap",
									alignItems: "center",
								}}
							>
								{images.map((image) => (
									<div
										key={image.lastModified * Math.random()}
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											gap: "12px",
										}}
									>
										<Typography variant="h6" color="#FFFFFF">
											{image.name}
										</Typography>
										<div
											style={{
												display: "flex",
												alignItems: "flex-start",
												marginLeft: "12px",
											}}
										>
											<img
												src={URL.createObjectURL(image)}
												alt="uploaded"
												style={{
													width: "100px",
													height: "100px",
												}}
											/>
											<IconButton
												style={{
													marginLeft: "-36px",
													padding: "8px",
												}}
												onClick={() => {
													setImages(images.filter((i) => i !== image));
												}}
											>
												<CloseOutlined
													style={{
														color: "#FFFFFF",
													}}
												/>
											</IconButton>
										</div>
									</div>
								))}
							</div>
						)}
						<Button
							variant="contained"
							onClick={handleSubmit}
							style={{
								background: "#202024",
								marginTop: "24px",
								width: "100%",
								textTransform: "none",
							}}
						>
							<Typography variant="h4" color="#FFFFFF">
								Submit Photos
							</Typography>
						</Button>
						{graffiti && <GalleryComponent graffiti={graffiti} />}
					</>
				</div>
			</div>
		</Dialog>
	);
}
