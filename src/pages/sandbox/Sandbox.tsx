/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import DirectionsIcon from "@mui/icons-material/Directions";
import SearchIcon from "@mui/icons-material/Search";
import { Button, createTheme, TextField, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";
import GraffitiAPI from "api/GraffitiAPI";
import { Formik, FormikProps, FormikValues } from "formik";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import GraffitiPhotoRequest from "models/graffitiphoto/GraffitiPhotoRequest";
import { ChangeEvent, useEffect, useState } from "react";
import * as yup from "yup";
import "./Sandbox.css";

const maxNumber = 6900000;

const theme = createTheme({
	palette: {
		primary: {
			main: "#ffff",
		},
	},
});

const Sandbox = () => {
	const [graffitiPosts, setGraffitiPosts] = useState<GraffitiResponse[]>();
	const [images, setImages] = useState<FileList | null>();

	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		let newFiles = event.target.files;
		setImages(newFiles);
		if (newFiles) {
			let url = URL.createObjectURL(newFiles[0]);
		}
	};

	// const [images, setImages] = useState<ImageListType>([]);

	useEffect(() => {
		getGraffitiPosts();
	}, []);

	const onChange = (addUpdateIndex: number[] | undefined) => {
		// data for submit
	};

	const getGraffitiPosts = async () => {
		// let response = await GraffitiPostAPI.findAll();
		let response = await GraffitiAPI.findById(1);
		// setGraffitiPosts(response);
	};

	const onSubmit = async (values: FormikValues) => {
		let file = values.file;
		if (file) {
			let url = URL.createObjectURL(file);
			let formData = new FormData();
			formData.append("file", file);

			let request: GraffitiPhotoRequest = {
				graffitiId: 1,
				addedAt: new Date(),
			};
			formData.append("body", JSON.stringify(request));

			let response = await GraffitiPhotoAPI.create(formData);
			console.log("response: ", response);
		}
	};

	return (
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
				<Typography
					color="common.white"
					sx={{
						mt: "12px",
						mb: "12px",
						fontFamily: "Times, Times New Roman, serif",
					}}
				>
					Enter an address of the graffiti
				</Typography>
				<Paper
					component="form"
					sx={{
						p: "2px 4px",
						display: "flex",
						alignItems: "center",
						width: 400,
						mb: "12px",
						fontFamily: "Times, Times New Roman, serif",
					}}
				>
					<InputBase
						sx={{ ml: 5, flex: 1, fontFamily: "Times, Times New Roman, serif" }}
						placeholder="Search Google Maps"
						inputProps={{ "aria-label": "search google maps" }}
					/>
					<IconButton type="button" sx={{ p: "10px" }} aria-label="search">
						<SearchIcon />
					</IconButton>
					<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
					<IconButton
						color="primary"
						sx={{ p: "10px" }}
						aria-label="directions"
					>
						<DirectionsIcon />
					</IconButton>
				</Paper>
			</div>
			<Formik
				validationSchema={validationSchema}
				initialValues={{
					file: null,
				}}
				onSubmit={onSubmit}
				npx
			>
				{(formik: FormikProps<any>) => (
					<>
						<label className="drop-container">
							<span className="drop-title">Drop files here</span>
							or
							<input
								id="file"
								name="file"
								type="file"
								onChange={(event) => {
									if (event.currentTarget.files) {
										formik.setFieldValue("file", event.currentTarget.files[0]);
									} else {
										formik.setFieldValue("file", null);
									}
								}}
							/>
						</label>
						<Button
							type="submit"
							variant="contained"
							onClick={() => {
								onSubmit(formik.values);
							}}
						>
							Submit
						</Button>
					</>
				)}
			</Formik>
			{images &&
				Array.from(images).map((image) => (
					<div key={image.name}>
						<img src={URL.createObjectURL(image)} alt={image.name} />
					</div>
				))}
		</div>
	);
};

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

export default Sandbox;
