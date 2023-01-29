import { CloseOutlined } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";
import GraffitiAPI from "api/GraffitiAPI";
import GalleryComponent from "components/gallery/GalleryComponent";
import UploadIconButton from "components/buttons/UploadIconButton";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AddPhotoToGraffitiPage = () => {
	const { id } = useParams();

	const [graffiti, setGraffiti] = useState<GraffitiResponse | undefined>();
	const [images, setImages] = useState<File[]>([]);

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
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				marginTop: "48px",
				padding: "42px",
				boxSizing: "border-box",
				width: "100%",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					width: "100%",
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
					color: "#000000",
					marginTop: "24px",
					width: "100%",
					textTransform: "none",
				}}
			>
				<Typography variant="h6" color="#FFFFFF">
					Submit Photos
				</Typography>
			</Button>
			{graffiti && <GalleryComponent graffiti={graffiti} />}
		</div>
	);
};

export default AddPhotoToGraffitiPage;
