import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Dialog, Typography } from "@mui/material";
import AuthAPI from "api/AuthAPI";
import FormTextField from "components/form/FormTextField";
import ReadableHiddenPasswordField from "components/form/ReadableHiddenPasswordField";
import { Form, Formik, FormikProps } from "formik";
import { useNavigate } from "react-router";
import * as yup from "yup";
import "./Login.css";

interface SignupProps {
	open: boolean;
	handleLoginOpen: () => void;
	handleClose: () => void;
}

const SignupDialog = (props: SignupProps) => {
	const navigate = useNavigate();
	const handleSubmit = async (values: RegistrationValues) => {
		console.log("values", values);
		let response = await AuthAPI.signup({ username: "l", password: "l" });
		props.handleClose();
		navigate("/home");

		console.log("AuthAPI response", response);
	};
	return (
		<Dialog
			open={props.open}
			onClose={props.handleClose}
			PaperProps={{
				style: {
					boxSizing: "border-box",
					minWidth: "600px",
					boxShadow: "none",
				},
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<div
					className={"login-header-buttons"}
					style={{
						backgroundColor: "#F5F5F5",
						width: "100%",
					}}
				>
					<Button
						className="button"
						onClick={() => {
							props.handleLoginOpen();
							props.handleClose();
						}}
					>
						<ArrowBackIosNew
							style={{
								height: "16px",
								width: "16px",
								marginRight: "4px",
							}}
						/>
						<Typography variant="h5" className="login-header-return-button">
							Back
						</Typography>
					</Button>
					<Typography
						variant="body"
						className="login-header-return-button"
						style={{
							fontStyle: "italic",
							marginRight: "24px",
						}}
					>
						Signing up
					</Typography>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(formik: FormikProps<RegistrationValues>) => (
						<Form className="register-dialog-container">
							<div className="input-container">
								<FormTextField
									name="name"
									label="Name"
									value={formik.values.name}
								/>
								<FormTextField
									name="lastname"
									label="Lastname"
									value={formik.values.lastname}
								/>

								<FormTextField
									name="email"
									label="Email"
									value={formik.values.email}
								/>

								<ReadableHiddenPasswordField name="password" />
								<FormTextField
									name="personalCode"
									label="Personal Code"
									value={formik.values.personalCode}
								/>
								<FormTextField
									name="phoneNumber"
									label="Phone Number"
									value={formik.values.phoneNumber}
								/>
								<FormTextField
									name="address"
									label="Address"
									value={formik.values.address}
								/>
							</div>
							<Button
								fullWidth
								onClick={() => formik.handleSubmit()}
								type="submit"
								color="primary"
								variant="contained"
								disabled={!formik.isValid || formik.isSubmitting}
								style={{
									textTransform: "none",
									padding: "16px 40px",
								}}
							>
								<Typography variant="h5" color="#FFFFFF">
									Register
								</Typography>
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</Dialog>
	);
};

interface RegistrationValues {
	name: string;
	lastname: string;
	email: string;
	password: string;
	personalCode: string;
	phoneNumber: string;
	address: string;
}

const initialValues: RegistrationValues = {
	name: "",
	lastname: "",
	email: "",
	password: "",
	personalCode: "",
	phoneNumber: "",
	address: "",
};

const validationSchema = yup.object({
	name: yup.string().required("Name is required"),
	lastname: yup.string().required("Lastname is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup.string().required("Password is required"),
	personalCode: yup.string().required("Personal code is required"),
	phoneNumber: yup.string().required("Phone number is required"),
	address: yup.string().required("Address is required"),
});

export default SignupDialog;
