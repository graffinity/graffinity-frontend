import { Button, Card, Dialog, Divider, Typography } from "@mui/material";
import AuthAPI from "api/AuthAPI";
import GraffitiPostAPI from "api/GraffitiPostAPI";
import FormTextField from "components/form/FormTextField";
import ReadableHiddenPasswordField from "components/form/ReadableHiddenPasswordField";
import { Formik, FormikProps } from "formik";
import LoginRequest from "models/auth/LoginRequest";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useRef, useState } from "react";
import common from "redux/common";
import { useAppSelector } from "redux/store/hooks";
import * as yup from "yup";
import "./Sandbox.css";

const Sandbox = () => {
	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);
	const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
	const [graffitiPosts, setGraffitiPosts] = useState<GraffitiResponse[]>();
	const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
	useEffect(() => {
		common.getStatus();
		getGraffitiPosts();
		console.log(isLoggedIn);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getGraffitiPosts = async () => {
		let response = await GraffitiPostAPI.findAll();
		setGraffitiPosts(response);
		console.log(response);
	};

	const ref = useRef<HTMLInputElement>(null);

	const handleSimpleLogin = async (request: LoginRequest) => {
		let response = await AuthAPI.login(request);
		common.getStatus(response);

		setLoggedIn(response.success);
	};

	const handleFormikSubmit = (values: any) => {
		handleSimpleLogin({
			username: values.username,
			password: values.password,
		});
	};

	return (
		<div className="sandbox-container">
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					flexWrap: "wrap",
					gap: "16px",

					width: "calc(100% - 72px)",
					height: "calc(100% - 72px)",

					background: "#FFFFFF",
					padding: "36px",
				}}
			>
				{graffitiPosts &&
					graffitiPosts.length > 0 &&
					graffitiPosts.map((graffiti) => (
						<div key={graffiti.id} className="graffiti-post-data-container">
							<div>
								<Typography variant="body2" fontWeight={700}>
									id:
								</Typography>
								<Typography variant="body2">{graffiti.id}</Typography>
							</div>
							<div>
								<Typography variant="body2" fontWeight={700}>
									name:
								</Typography>
								<Typography>{graffiti.name}</Typography>
							</div>
							<div>
								<Typography variant="body2" fontWeight={700}>
									description:
								</Typography>
								<Typography variant="body2">{graffiti.description}</Typography>
							</div>
							<div>
								<Typography variant="body2" fontWeight={700}>
									location:
								</Typography>
								<Typography variant="body2">{graffiti.location}</Typography>
							</div>
							<div>
								<Typography variant="body2" fontWeight={700}>
									creationDate:
								</Typography>

								<Typography variant="body2">
									{graffiti.creationDate?.toString()}
								</Typography>
							</div>
						</div>
					))}
			</div>
			<Divider
				variant="fullWidth"
				orientation="vertical"
				style={{
					background: "#D9D9D9",
					width: "1.5px",
				}}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "16px",

					background: "#FFFFFF",
					padding: "36px",
					width: "calc(100% - 72px)",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: "8px",

						width: "40%",
					}}
				>
					<Typography variant="body2" fontWeight={700}>
						isLoggedIn:
					</Typography>
					{isLoggedIn === undefined ? (
						<Typography variant="body2" color="error">
							undefined
						</Typography>
					) : (
						<Typography variant="body2" color={isLoggedIn ? "green" : "error"}>
							{isLoggedIn?.toString()}
						</Typography>
					)}
				</div>
				<Divider
					variant="fullWidth"
					style={{
						color: "#D9D9D9",
						margin: "0px -36px",
					}}
				/>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: "16px",

						background: "#FFFFFF",
						padding: "36px",
						width: "calc(100% - 72px)",
					}}
				>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							setLoginDialogOpen(true);
						}}
						style={{
							padding: "8px 48px",
						}}
					>
						Login
					</Button>
				</div>
			</div>
			<Dialog
				open={loginDialogOpen}
				onClose={() => {
					setLoginDialogOpen(false);
				}}
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
						onSubmit={handleFormikSubmit}
					>
						{(formik: FormikProps<any>) => (
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
								{loggedIn === false && (
									<label style={{ color: "red" }}>
										"Username and/or password is incorrect.",
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
						)}
					</Formik>
				</Card>
			</Dialog>
		</div>
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

export interface LoginResponse {
	access_token: string;
	success: boolean;
}

export default Sandbox;
