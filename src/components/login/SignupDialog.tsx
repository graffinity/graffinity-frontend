import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Card, Dialog, Divider, Typography } from "@mui/material";
import AuthAPI from "api/AuthAPI";
import UserAPI from "api/UserAPI";
import FormTextField from "components/form/FormTextField";
import ReadableHiddenPasswordField from "components/form/ReadableHiddenPasswordField";
import { Form, Formik, FormikProps } from "formik";
import UserCreateRequest from "models/user/UserCreateRequest";
import * as yup from "yup";
import "./Login.css";
import _ from "lodash";

interface SignupProps {
	open: boolean;
	handleLoginOpen: () => void;
	handleClose: () => void;
}

const SignupDialog = (props: SignupProps) => {
	const handleSubmit = async (values: RegistrationValues) => {
		let request: UserCreateRequest = {
			username: values.username,
			email: values.email,
			password: values.password,
			name: values.name,
			lastname: values.lastname,
		};
		await AuthAPI.signup(request);
		props.handleClose();
		window.location.reload();
	};
	return (
		<Dialog
			open={props.open}
			onClose={props.handleClose}
			PaperProps={{
				style: {
					boxSizing: "border-box",
					width: "100%",
					boxShadow: "none",
				},
			}}
		>
			<Card
				style={{
					overflow: "auto",
					height: "100%",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: "100%",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							width: "100%",
							boxSizing: "border-box",
						}}
					>
						<div
							className={"login-header-buttons"}
							style={{
								display: "flex",
								alignItems: "center",
								backgroundColor: "#F5F5F5",
								padding: "8px",
								boxSizing: "border-box",
								width: "100%",
								height: "100%",
							}}
						>
							<Button
								className="button"
								onClick={() => {
									props.handleLoginOpen();
									props.handleClose();
								}}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "6px",
								}}
							>
								<ArrowBackIosNew
									style={{
										height: "16px",
										width: "16px",
										marginRight: "6px",
										color: "#000000",
										opacity: "0.7",
									}}
								/>
								<Typography
									variant="h5"
									className="login-header-return-button"
									style={{
										textTransform: "none",
										opacity: "0.8",
									}}
								>
									Login
								</Typography>
							</Button>
						</div>
					</div>

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{(formik: FormikProps<RegistrationValues>) => (
							<Form
								className="register-dialog-container"
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "16px",
									padding: "24px 32px",
									width: "100%",
									boxSizing: "border-box",
								}}
							>
								<Divider>
									<Typography variant="body">Sign up</Typography>
								</Divider>
								<div
									className="input-container"
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										gap: "12px",
										padding: "12px",
										boxSizing: "border-box",
										width: "100%",
									}}
								>
									<FormTextField
										title="Name"
										name="name"
										placeholder="Name"
										value={formik.values.name}
									/>
									<FormTextField
										title="Lastname"
										name="lastname"
										placeholder="Lastname"
										value={formik.values.lastname}
									/>

									<FormTextField
										title="Username"
										name="username"
										placeholder="Username"
										value={formik.values.username}
									/>
									<FormTextField
										title="Email"
										name="email"
										placeholder="Email"
										value={formik.values.email}
									/>

									<ReadableHiddenPasswordField
										name="password"
										title="Password"
									/>

									<ReadableHiddenPasswordField
										name="repeatPassword"
										title="Repeat password"
									/>
									<Button
										fullWidth
										type="submit"
										color="primary"
										variant="contained"
										disabled={!formik.isValid || formik.isSubmitting}
										style={{
											marginTop: "32px",
											marginBottom: "-8px",
											textTransform: "none",
											padding: "16px 32px",
											boxSizing: "border-box",
										}}
									>
										<Typography variant="h5" color="#FFFFFF">
											Sign up
										</Typography>
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</Card>
		</Dialog>
	);
};

interface RegistrationValues {
	name: string;
	lastname: string;
	username: string;
	email: string;
	password: string;
	repeatPassword: string;
}

const initialValues: RegistrationValues = {
	name: "",
	lastname: "",
	username: "",
	email: "",
	password: "",
	repeatPassword: "",
};

const validationSchema = yup.object({
	name: yup.string().nullable().required("Name is required"),
	lastname: yup.string().nullable().required("Lastname is required"),
	username: yup
		.string()
		.nullable()
		.required("Username is required")
		.test(
			"validator",
			"An account with this username already exists",
			async (value) => {
				if (!_.isEmpty(value) && !_.isNil(value)) {
					let isDuplicate = await UserAPI.existsByUsername(value);
					return !isDuplicate;
				}
				return true;
			}
		),
	email: yup
		.string()
		.nullable()
		.email("Invalid email")
		.required("Email is required")
		.test(
			"validator",
			"An account with this email already exists",
			async (value) => {
				if (!_.isEmpty(value) && !_.isNil(value)) {
					let isDuplicate = await UserAPI.existsByEmail(value);
					return !isDuplicate;
				}
				return true;
			}
		),
	password: yup
		.string()
		.nullable()
		.required("Password is required")
		.test("validator", "Password must match", function (value) {
			if (!_.isEmpty(value) && !_.isNil(value)) {
				return value === this.parent.repeatPassword;
			}
			return true;
		}),
	repeatPassword: yup
		.string()
		.nullable()
		.required("Repeat password is required")
		.oneOf([yup.ref("password")], "Passwords must match"),
});

export default SignupDialog;
