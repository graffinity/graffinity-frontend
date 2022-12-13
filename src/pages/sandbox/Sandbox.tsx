import { Button, Divider, Typography } from "@mui/material";
import AuthAPI from "api/AuthAPI";
import GraffitiPostAPI from "api/GraffitiPostAPI";
import LoginDialog from "components/login/LoginDialog";
import { Form, Formik } from "formik";
import LoginRequest from "models/auth/LoginRequest";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import GraffitiRequest from "models/graffiti/GraffitiRequest";
import { useEffect, useState } from "react";
import common from "redux/common";
import { useAppSelector } from "redux/store/hooks";
import * as yup from "yup";
import "./Sandbox.css";
import FormTextField from "components/form/FormTextField";

const Sandbox = () => {
	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);
	const userInfo = useAppSelector((state) => state.common.userInfo);
	const [graffitiPosts, setGraffitiPosts] = useState<GraffitiResponse[]>();
	const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
	const [loginSuccess, setLoginSuccess] = useState<boolean>();
	useEffect(() => {
		if (!isLoggedIn) {
			common.getStatus();
		}
		common.setUserInfo(1);
		getGraffitiPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getGraffitiPosts = async () => {
		let response = await GraffitiPostAPI.findAll();
		setGraffitiPosts(response);
		console.log(response);
	};

	const handleSimpleLogin = async (request: LoginRequest) => {
		try {
			let response = await AuthAPI.login(request);
			common.getStatus(response);
			// common.handleLogin(response.success);
			setLoginSuccess(response.success);
		} catch (e) {
			console.error(e);
			setLoginSuccess(false);
			common.handleLogin(false);
		}
	};

	const handleFormikSubmit = (values: any) => {
		handleSimpleLogin({
			username: values.username,
			password: values.password,
		});
	};

	const handleLoginDialogClose = () => {
		setLoginDialogOpen(false);
		setLoginSuccess(undefined);
	};

	const handlePostSubmit = (values: CreatePostValues) => {
		let request: GraffitiRequest = {
			name: values.name,
			location: values.location,
			description: values.description,
			authorId: userInfo ? userInfo.userId : 1,
			categoryIds: [],
			createdAt: new Date(),
		};

		GraffitiPostAPI.create(request);
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
							textTransform: "none",
						}}
					>
						Login
					</Button>
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
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						gap: "16px",

						background: "#FFFFFF",
						padding: "36px",
						width: "calc(100% - 72px)",
					}}
				>
					<Formik
						initialValues={initialValues}
						onSubmit={handlePostSubmit}
						validationSchema={validationSchema}
						enableReinitialize
					>
						{(formik) => (
							<Form
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "flex-start",
									alignItems: "center",
									gap: "8px",
								}}
							>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									disabled={!isLoggedIn}
									style={{
										padding: "8px 48px",
										textTransform: "none",
										marginBottom: "16px",
									}}
								>
									<Typography variant="body" color="#FFFFFF">
										Create Graffiti Post
									</Typography>
								</Button>
								<FormTextField name="name" title="Graffiti name" />
								<FormTextField
									name="description"
									title="Graffiti description"
								/>
								<FormTextField name="location" title="Graffiti location" />
							</Form>
						)}
					</Formik>
				</div>
			</div>
			<LoginDialog
				open={loginDialogOpen}
				loginSuccess={loginSuccess}
				handleClose={handleLoginDialogClose}
				handleSubmit={handleFormikSubmit}
			/>
		</div>
	);
};

export interface LoginResponse {
	access_token: string;
	success: boolean;
}

export interface CreatePostValues {
	name: string;
	description: string;
	location: string;
}

const initialValues: CreatePostValues = {
	name: "",
	description: "",
	location: "",
};

const validationSchema = yup.object({
	name: yup.string().required("Graffiti name is required"),
	description: yup.string().required("Description name is required"),
	location: yup.string().required("Location name is required"),
});

export default Sandbox;
