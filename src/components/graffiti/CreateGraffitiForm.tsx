import { Button } from "@mui/material";
import ArtistAPI from "api/ArtistAPI";
import FormAutocomplete from "components/form/FormAutocomplete";
import FormTextField from "components/form/FormTextField";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import ArtistResponse from "models/artist/ArtistResponse";
import { useEffect, useState } from "react";
import * as yup from "yup";

interface CreateGraffitiFormProps {
	handleSubmit: (values: FormikValues) => Promise<void>;
}

const CreateGrafiitiForm = (props: CreateGraffitiFormProps) => {
	const { handleSubmit } = props;

	const [artists, setArtists] = useState<ArtistResponse[]>();

	useEffect(() => {
		getArtists();
	}, []);

	const getArtists = async () => {
		let response = await ArtistAPI.findAll();
		setArtists(response);
	};

	const artistIds = artists?.map((artist) => artist.id) || [];

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={initialValues}
			onSubmit={handleSubmit}
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
						title="Graffiti Name"
						titleprops={{
							style: { color: "#FFFFFF" },
						}}
						inputStyle={{
							color: "#FFFFFF",
						}}
					/>
					<FormTextField
						name="description"
						title="Graffiti Description"
						titleprops={{
							style: { color: "#FFFFFF" },
						}}
						inputStyle={{
							color: "#FFFFFF",
						}}
					/>
					<FormTextField
						name="location"
						title="Location"
						titleprops={{
							style: { color: "#FFFFFF" },
						}}
						inputStyle={{
							color: "#FFFFFF",
						}}
					/>
					<FormAutocomplete
						name="authorId"
						// TODO: Implement artist names not ids
						options={artistIds}
						title="Artist"
						titleprops={{
							style: { color: "#FFFFFF" },
						}}
						inputStyle={{
							color: "#FFFFFF",
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
										formik.setFieldValue("file", event.currentTarget.files[0]);
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
	);
};

interface CreateGrafiitiValues {
	name: string;
	description: string;
	latitude: string;
	longitude: string;
	authorId: number;
	file: any;
}

const initialValues: CreateGrafiitiValues = {
	name: "",
	description: "",
	latitude: "",
	longitude: "",
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

export default CreateGrafiitiForm;
