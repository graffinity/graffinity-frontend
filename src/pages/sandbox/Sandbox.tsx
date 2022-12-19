import { Button } from "@mui/material";
import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";
import GraffitiPostAPI from "api/GraffitiPostAPI";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import IFile from "models/file/IFile";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import GraffitiPhotoRequest from "models/graffitiphoto/GraffitiPhotoRequest";
import { ChangeEvent, useEffect, useState } from "react";
import * as yup from "yup";

const maxNumber = 6900000;

const Sandbox = () => {
	const [graffitiPosts, setGraffitiPosts] = useState<GraffitiResponse[]>();
	const [images, setImages] = useState<FileList | null>();

	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		let newFiles = event.target.files;
		setImages(newFiles);
		console.log("newFiles", newFiles);
		if (newFiles) {
			let url = URL.createObjectURL(newFiles[0]);
			console.log("url", url);
		}
	};

	// const [images, setImages] = useState<ImageListType>([]);

	useEffect(() => {
		// getGraffitiPosts();
	}, []);

	const onChange = (addUpdateIndex: number[] | undefined) => {
		// data for submit
	};

	const getGraffitiPosts = async () => {
		let response = await GraffitiPostAPI.findAll();
		setGraffitiPosts(response);
		console.log(response);
	};

	const onSubmit = async (values: FormikValues) => {
		let file = values.file;
		if (file) {
			console.log("file", file);
			let url = URL.createObjectURL(file);
			let formData = new FormData();
			formData.append("file", file);
			let filename = file.name;

			let iFile: IFile = {
				originalname: filename,
				buffer: file,
				mimetype: file.type,
			};

			let request: GraffitiPhotoRequest = {
				file: iFile,
				graffitiId: 1,
				url: url,
				userId: 1,
				addedAt: new Date(),
			};
			formData.append("body", JSON.stringify(request));

			let response = await GraffitiPhotoAPI.create(formData);
			console.log("response: ", response);
		}
		console.log("no file :(");
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				padding: "24px",
				width: "100%",
				height: "100%",
				gap: "8px",
			}}
		>
			<Formik
				validationSchema={validationSchema}
				initialValues={{
					file: null,
				}}
				onSubmit={onSubmit}
			>
				{(formik: FormikProps<any>) => (
					<Form>
						{/* <Button variant='contained' component='label'> */}
						Upload Photo
						{/* <input
								type='file'
								name='file'
								hidden
								onChange={(event) => handleFileUpload(event)}
							/> */}
						<input
							id="file"
							name="file"
							type="file"
							onChange={(event) => {
								if (event.currentTarget.files) {
									formik.setFieldValue("file", event.currentTarget.files[0]);
									console.log("event", event.currentTarget.files);
								} else {
									formik.setFieldValue("file", null);
								}
							}}
						/>
						{/* </Button> */}
						<Button type="submit" variant="contained">
							Submit
						</Button>
					</Form>
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
