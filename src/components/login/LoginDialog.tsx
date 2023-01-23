import { Button, Card, Dialog, Divider, Typography } from "@mui/material";
import AuthAPI from "api/AuthAPI";
import FormTextField from "components/form/FormTextField";
import ReadableHiddenPasswordField from "components/form/ReadableHiddenPasswordField";
import { Formik, FormikProps } from "formik";
import LoginRequest from "models/auth/LoginRequest";
import { useRef } from "react";
import * as yup from "yup";

interface LoginDialogProps {
	open: boolean;
	handleClose: () => void;
	// handleSubmit: (values: any) => void;
	loginSuccess?: boolean;
	handleRegisterOpen: () => void;
}

const LoginDialog = (props: LoginDialogProps) => {
	const { open, loginSuccess, handleClose } = props;

	const handleSubmit = async (values: LoginRequest) => {
		await AuthAPI.login(values);
		handleClose();
	};

	const ref = useRef<HTMLInputElement>(null);
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				style: {
					width: "100%",
					maxWidth: "630px",
					borderRadius: "8px",
					boxShadow:
						"0px 6px 12px -6px rgba(0, 43, 0, 0.05), 0px 8px 22px -4px rgba(0, 43, 0, 0.05)",
				},
			}}
		>
			<Card
				style={{
					overflow: "auto",
					height: "100%",
				}}
			>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(formik: FormikProps<any>) => {
						return (
							<div
								className="login-with-password-body"
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "16px",
									padding: "24px 32px",
									boxSizing: "border-box",
								}}
							>
								<Divider>
									<Typography variant="body">Login</Typography>
								</Divider>

								<FormTextField
									title={"Username"}
									name={"username"}
									className={"login-input"}
									onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
										if (event.key === "Enter") {
											if (formik.isValid) {
												formik.submitForm();
											} else {
												ref.current?.focus();
											}
										}
									}}
								/>
								<ReadableHiddenPasswordField
									title={"Password"}
									autoComplete={"current-password"}
									inputRef={ref}
									name={"password"}
									enableEnterSubmit={true}
									enterSubmitAction={() => formik.handleSubmit()}
									className={"login-input"}
								/>
								{loginSuccess === false && (
									<label style={{ color: "red" }}>
										Username and/or password is incorrect
									</label>
								)}
								<Button
									fullWidth
									onClick={() => formik.handleSubmit()}
									type="submit"
									color={"primary"}
									variant={"contained"}
									disabled={!formik.isValid}
									style={{
										margin: "16px 0px",
										textTransform: "none",
										padding: "16px 40px",
									}}
								>
									<Typography variant="h5" color="#FFFFFF">
										Login
									</Typography>
								</Button>

								<Divider>
									<Typography variant="body">Or</Typography>
								</Divider>

								<Button
									fullWidth
									onClick={() => {
										props.handleRegisterOpen();
										handleClose();
									}}
									type="submit"
									color={"primary"}
									variant={"contained"}
									disabled={!formik.isValid}
									style={{
										textTransform: "none",
										padding: "16px 40px",
									}}
								>
									<Typography variant="h5" color="#FFFFFF">
										Signup
									</Typography>
								</Button>
							</div>
						);
					}}
				</Formik>
			</Card>
		</Dialog>
	);
};

const initialValues: LoginRequest = {
	username: "",
	password: "",
};

const validationSchema = yup.object({
	username: yup.string().required("Username is required."),
	password: yup.string().required("Password is required"),
});

export default LoginDialog;
