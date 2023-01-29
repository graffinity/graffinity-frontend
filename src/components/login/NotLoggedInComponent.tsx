import { Button, Typography } from "@mui/material";
import { useState } from "react";
import LoginDialog from "./LoginDialog";
import SignUpDialog from "./SignupDialog";

const NotLoggedInComponent = () => {
	const [loginDialogOpen, setLoginDialogOpen] = useState(false);
	const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

	const handleLoginDialogOpen = () => {
		setLoginDialogOpen(true);
	};

	const handleLoginDialogClose = () => {
		setLoginDialogOpen(false);
	};

	const handleRegisterDialogOpen = () => {
		setRegisterDialogOpen(true);
	};

	const handleRegisterDialogClose = () => {
		setRegisterDialogOpen(false);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "60%",
				marginTop: "64px",
				marginBottom: "96px",
				padding: "36px",
				gap: "24px",
				border: "1px solid #FFFFFF",
				boxSizing: "border-box",
				borderRadius: "16px",
			}}
		>
			<Typography variant="h3" color="white" align="center">
				This action is only available to logged in users
			</Typography>
			<Typography variant="h5" color="white" align="center">
				Please log in or sign up to continue...
			</Typography>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "80%",
					padding: "24px",
					boxSizing: "border-box",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						gap: "36px",
						padding: "32px",
						boxSizing: "border-box",
					}}
				>
					<Button
						onClick={handleLoginDialogOpen}
						variant="outlined"
						style={{
							borderColor: "white",
							padding: "8px 32px",
							width: "50%",
						}}
					>
						<Typography
							variant="h5"
							style={{
								textTransform: "none",
								color: "white",
							}}
						>
							Login
						</Typography>
					</Button>
					<Button
						onClick={handleRegisterDialogOpen}
						variant="outlined"
						style={{
							padding: "8px 24px",
							borderColor: "white",
							width: "50%",
						}}
					>
						<Typography
							variant="h5"
							style={{
								color: "white",
								textTransform: "none",
							}}
						>
							Sign Up
						</Typography>
					</Button>
				</div>
				<LoginDialog
					open={loginDialogOpen}
					handleClose={handleLoginDialogClose}
					handleRegisterOpen={handleRegisterDialogOpen}
				/>
				<SignUpDialog
					open={registerDialogOpen}
					handleClose={handleRegisterDialogClose}
					handleLoginOpen={handleLoginDialogOpen}
				/>
			</div>
		</div>
	);
};

export default NotLoggedInComponent;
