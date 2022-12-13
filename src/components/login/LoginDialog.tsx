import { Button, Card, Dialog, Divider, Typography } from "@mui/material";
import FormTextField from "components/form/FormTextField";
import ReadableHiddenPasswordField from "components/form/ReadableHiddenPasswordField";
import { Formik, FormikProps } from "formik";
import { useRef } from "react";
import * as yup from "yup";

interface LoginDialogProps {
	open: boolean;
	handleClose: () => void;
	handleSubmit: (values: any) => void;
	loginSuccess?: boolean;
}

const LoginDialog = (props: LoginDialogProps) => {
	const { open, loginSuccess, handleClose, handleSubmit } = props;

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
									padding: "24px",
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
										textTransform: "none",
										padding: "16px 40px",
									}}
								>
									<Typography variant="h5" color="#FFFFFF">
										Prisijungti
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

const initialValues = {
	username: "",
	password: "",
};

const validationSchema = yup.object({
	username: yup.string().required("Username is required."),
	password: yup.string().required("Password is required"),
});

export default LoginDialog;
