import { Button } from "@mui/material";
import ArtistAPI from "api/ArtistAPI";
import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";
import GraffitiPostAPI from "api/GraffitiPostAPI";
import FormAutocomplete from "components/form/FormAutocomplete";
import FormTextField from "components/form/FormTextField";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import ArtistResponse from "models/artist/ArtistResponse";
import IFile from "models/file/IFile";
import GraffitiRequest from "models/graffiti/GraffitiRequest";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import GraffitiPhotoRequest from "models/graffitiphoto/GraffitiPhotoRequest";
import { useEffect, useState } from "react";
import { initialState } from "redux/store/common/commonSlice";
import * as yup from "yup";

const CreateGrafiitiPage = () => {
	const [graffitiPosts, setGraffitiPosts] = useState<GraffitiResponse[]>();
	const [artists, setArtists] = useState<ArtistResponse[]>();

	useEffect(() => {
		getGraffitiPosts();
		getArtists();
	}, []);

	const getGraffitiPosts = async () => {
		let response = await GraffitiPostAPI.findAll();
		setGraffitiPosts(response);
	};

	const getArtists = async () => {
		let response = await ArtistAPI.findAll();
		setArtists(response);
	};

	const artistIds = artists?.map((artist) => artist.id) || [];
	const graffitiIds = graffitiPosts?.map((graffiti) => graffiti.id) || [];

	const onSubmit = async (values: FormikValues) => {
		let file = values.file;
		if (file) {
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

			let graffitiReq: GraffitiRequest = {
				name: values.name,
				description: values.description,
				location: values.location,
				createdAt: new Date(),
				authorId: values.authorId,
				artistIds: values.authorId,
				categoryIds: [],
			};
			formData.append("body", JSON.stringify(request));

			await GraffitiPostAPI.create(graffitiReq);
			await GraffitiPhotoAPI.create(formData);
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
			<Formik
				validationSchema={validationSchema}
				initialValues={initialValues}
				onSubmit={onSubmit}
				enableReinitialize
			>
				{(formik: FormikProps<any>) => (
					<Form
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							padding: "24px",
							height: "100%",
							gap: "8px",
						}}
					>
						<FormTextField
							name="name"
							title="Graffiti Post Name"
							titleprops={{
								style: { color: "#FFFFFF" },
							}}
						/>
						<FormTextField
							name="description"
							title="Description"
							titleprops={{
								style: { color: "#FFFFFF" },
							}}
						/>
						<FormTextField
							name="location"
							title="Location"
							titleprops={{
								style: { color: "#FFFFFF" },
							}}
						/>
						<FormAutocomplete
							name="authorId"
							options={artistIds}
							title="Artist"
							titleProps={{
								style: { color: "#FFFFFF" },
							}}
						/>
						<div
							style={{
								display: "flex",
								marginTop: "24px",
							}}
						>
							<label className="drop-container">
								<span className="drop-title">Drop files here</span>
								or
								<input
									id="file"
									name="file"
									type="file"
									onChange={(event) => {
										if (event.currentTarget.files) {
											formik.setFieldValue(
												"file",
												event.currentTarget.files[0]
											);
										} else {
											formik.setFieldValue("file", null);
										}
									}}
								/>
							</label>
						</div>
						<Button
							type="submit"
							variant="contained"
							disabled={formik.isSubmitting || !formik.isValid}
							style={{
								marginTop: "24px",
								width: "100%",
								textTransform: "none",
							}}
						>
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

interface CreateGrafiitiValues {
	name: string;
	description: string;
	location: string;
	authorId: number;
	file: any;
}

const initialValues: CreateGrafiitiValues = {
	name: "",
	description: "",
	location: "",
	authorId: 0,
	file: null,
};

const validationSchema = yup.object({
	name: yup.string().required("A name is required"),
	description: yup.string().required("A description is required"),
	location: yup.string().required("A location is required"),
	authorId: yup.number().required("An author is required"),
	file: yup.mixed().nullable().required("A file is required"),
});

export default CreateGrafiitiPage;
