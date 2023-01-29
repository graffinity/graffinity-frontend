import { CloseOutlined } from "@mui/icons-material";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import ArtistAPI from "api/ArtistAPI";
import FormAutocomplete from "components/form/FormAutocomplete";
import FormTextField from "components/form/FormTextField";
import NotLoggedInComponent from "components/login/NotLoggedInComponent";
import { Form, Formik, FormikProps } from "formik";
import ArtistResponse from "models/artist/ArtistResponse";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppSelector } from "redux/store/hooks";
import * as yup from "yup";

interface CreateGraffitiFormProps {
	handleSubmit: (values: any) => Promise<void>;
}

const CreateGrafiitiForm = (props: CreateGraffitiFormProps) => {
	const { handleSubmit } = props;

	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);
	const [images, setImages] = useState<File[]>([]);
	const [artists, setArtists] = useState<ArtistResponse[]>();

	const hiddenInputRef = useRef<HTMLInputElement | null>(null);

	const handleClick = () => {
		hiddenInputRef.current?.click();
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			let image = e.target.files[0];

			handleImageUpload(image);
		}
	};

	useEffect(() => {
		getArtists();
	}, []);

	const getArtists = async () => {
		let response = await ArtistAPI.findAll();
		setArtists(response);
	};

	const artistIds = artists?.map((artist) => artist.id.toString()) || [];
	artistIds.push("Unknown");

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
		<Formik
			validationSchema={validationSchema}
			initialValues={initialValues}
			onSubmit={handleSubmit}
			enableReinitialize
		>
			{(formik: FormikProps<any>) => (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						padding: "48px",
						boxSizing: "border-box",
						flexWrap: "wrap",
						gap: "16px",
						width: "100%",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-start",
							width: "100%",
							alignItems: "center",
							paddingLeft: "24px",
						}}
					>
						<Typography
							variant="h1"
							style={{
								color: "#FFFFFF",
							}}
						>
							Create Graffiti Page
						</Typography>
					</div>
					<Divider
						style={{
							marginTop: "16px",
							width: "100%",
							borderColor: "#FFFFFF",
							marginLeft: "-72px",
							// marginRight: "-24px",
						}}
					/>
					<Form
						style={{
							display: "flex",
							alignItems: "center",
							padding: "24px",
							width: "100%",
							gap: "8px",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								padding: "24px",
								width: "100%",
								gap: "8px",
							}}
						>
							<FormTextField
								name="name"
								title="Graffiti Name"
								label="Name"
								titleprops={{
									style: { color: "#FFFFFF" },
								}}
								inputstyle={{
									color: "#FFFFFF",
								}}
								InputLabelProps={{
									style: {
										color: "#FFFFFF",
										marginTop: "-3px",
										opacity: 0.5,
									},
								}}
							/>
							<FormTextField
								name="description"
								title="Graffiti Description"
								label="Description"
								titleprops={{
									style: { color: "#FFFFFF" },
								}}
								inputstyle={{
									color: "#FFFFFF",
								}}
								InputLabelProps={{
									style: { color: "#FFFFFF", marginTop: "-3px", opacity: 0.5 },
								}}
							/>
							<FormTextField
								name="latitude"
								title="Graffiti Latitude"
								label="Latitude"
								titleprops={{
									style: { color: "#FFFFFF" },
								}}
								inputstyle={{
									color: "#FFFFFF",
								}}
								InputLabelProps={{
									style: { color: "#FFFFFF", marginTop: "-3px", opacity: 0.5 },
								}}
							/>
							<FormTextField
								name="longitude"
								title="Graffiti Longitude"
								label="Longitude"
								titleprops={{
									style: { color: "#FFFFFF" },
								}}
								inputstyle={{
									color: "#FFFFFF",
								}}
								InputLabelProps={{
									style: { color: "#FFFFFF", marginTop: "-3px", opacity: 0.5 },
								}}
							/>
							{/* <FormTextField
						name="location"
						title="Location"
						titleprops={{
							style: { color: "#FFFFFF" },
						}}
						inputstyle={{
							color: "#FFFFFF",
						}}
					/> */}
							<FormAutocomplete
								name="artistId"
								label="Artist"
								// TODO: Implement artist names not ids
								options={artistIds}
								title="Graffiti Artist"
								titleprops={{
									style: { color: "#FFFFFF" },
								}}
								InputLabelProps={{
									style: { color: "#ffffff", opacity: 0.5, marginTop: "-3px" },
								}}
								inputstyle={{
									color: "#FFFFFF",
								}}
							/>
						</div>
						<div
							style={{
								display: "flex",
								padding: "24px",
								boxSizing: "border-box",
								height: "100%",
								width: "100%",
								marginTop: "24px",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{/* <label
								className="drop-container"
								style={{
									height: "100%",
									padding: "24px",
									boxSizing: "border-box",
								}}
							>
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
							</label> */}
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
								<label
									className="drop-container"
									style={{
										height: "200%",
										padding: "24px",
										width: "100%",
										boxSizing: "border-box",
									}}
								>
									{isLoggedIn && (
										<>
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													width: "100%",
												}}
											>
												<Button
													style={{ background: "transparent" }}
													onClick={() => {
														handleClick();
													}}
												>
													{" "}
													<span className="drop-title">
														Drop files here
													</span>{" "}
												</Button>
												<input
													name="file"
													multiple
													alt="Upload Image"
													accept="image/*"
													type="file"
													onChange={(event) => {
														handleFileChange(event);
														if (event.currentTarget.files) {
															formik.setFieldValue(
																"file",
																event.currentTarget.files[0]
															);
														} else {
															formik.setFieldValue("file", null);
														}
													}}
													ref={hiddenInputRef}
													style={{ display: "none" }}
												/>
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
																		setImages(
																			images.filter((i) => i !== image)
																		);
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
										</>
									)}
									{!isLoggedIn && <NotLoggedInComponent />}
								</label>
							</div>
						</div>
					</Form>
					<div
						style={{
							display: "flex",
							padding: "0px 24px",
							boxSizing: "border-box",
							width: "100%",
						}}
					>
						<Button
							type="submit"
							onClick={() => handleSubmit(formik.values)}
							variant="contained"
							disabled={!formik.isValid}
							style={{
								marginTop: "12px",
								width: "49%",
								textTransform: "none",
								padding: "12px 0px",
								color: "#FFFFFF",
							}}
						>
							<Typography
								variant="h6"
								fontWeight={500}
								fontSize={16}
								style={{
									color: "#FFFFFF",
								}}
							>
								Submit
							</Typography>
						</Button>
					</div>
				</div>
			)}
		</Formik>
	);
};

interface CreateGrafiitiValues {
	name: string;
	description: string;
	latitude: string;
	longitude: string;
	artistId: number | null;
	file: any;
}

const initialValues: CreateGrafiitiValues = {
	name: "",
	description: "",
	latitude: "",
	longitude: "",
	artistId: null,
	file: [],
};

const validationSchema = yup.object({
	name: yup.string().nullable().required("A name is required"),
	description: yup.string().nullable().required("A description is required"),
	// location: yup.string().required("A location is required"),
	latitude: yup.string().nullable().required("A latitude is required"),
	longitude: yup.string().nullable().required("A longitude is required"),
	artistId: yup.string().nullable().notRequired(),
});

export default CreateGrafiitiForm;
