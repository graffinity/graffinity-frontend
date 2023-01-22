import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import AuthAPI from "api/AuthAPI";
import DrawerComponent from "components/drawer/Drawer";
import LoginDialog from "components/login/LoginDialog";
import SignUpDialog from "components/login/SignupDialog";
import RouteItem from "models/routes/RouteItem";
import { useState } from "react";
import { useAppSelector } from "redux/store/hooks";
import "./Common.css";

interface HeaderProps {
	setActivePage: (currentPage: RouteItem) => void;
}

const Header = (props: HeaderProps) => {
	const { setActivePage } = props;

	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

	const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
	const [signUpDialogOpen, setSignUpDialogOpen] = useState<boolean>(false);
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

	const handleOpenSignUpDialog = () => {
		setSignUpDialogOpen(true);
	};
	const handleCloseSignUpDialog = () => {
		setSignUpDialogOpen(false);
	};

	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	const handleOpenLoginDialog = () => {
		setLoginDialogOpen(true);
	};

	const handleCloseLoginDialog = () => {
		setLoginDialogOpen(false);
	};

	const handleLogout = async () => {
		let res = await AuthAPI.logout();
		console.log("logout res", res);
	};

	return (
		<AppBar
			position="static"
			sx={{
				display: "block",
				background: "transparent",
				boxShadow: "none",
			}}
		>
			<Toolbar
				disableGutters={true}
				style={{
					backgroundColor: "rgb(32, 32, 36)",
					borderRadius: "0 0 16px 16px",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "0px 32px",
						width: "100%",
					}}
				>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						onClick={handleDrawerOpen}
						style={{
							marginLeft: "8px",
						}}
					>
						<MenuIcon />
					</IconButton>

					<div style={{ marginLeft: "20px" }}></div>
					<div>
						{!isLoggedIn ? (
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "0px 32px",
									gap: "24px",
								}}
							>
								<Button
									onClick={handleOpenLoginDialog}
									variant="outlined"
									style={{
										borderColor: "white",
										padding: "8px 24px",
									}}
								>
									{/* <Avatar alt="Remy Sharp" src="https://i.imgur.com/0y0y0y0.png" /> */}
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
									onClick={handleOpenSignUpDialog}
									variant="outlined"
									style={{
										padding: "8px 24px",
										borderColor: "white",
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
						) : (
							<Button
								onClick={handleLogout}
								variant="outlined"
								style={{
									padding: "8px 24px",
									borderColor: "white",
								}}
							>
								<Typography
									variant="h5"
									style={{
										color: "white",
										textTransform: "none",
									}}
								>
									Logout
								</Typography>
							</Button>
						)}
						{/* <AccountInfo me={me} logoff={logoff} /> */}
					</div>
				</div>
			</Toolbar>
			<LoginDialog
				open={loginDialogOpen}
				handleClose={handleCloseLoginDialog}
			/>
			<SignUpDialog
				open={signUpDialogOpen}
				handleClose={handleCloseSignUpDialog}
				handleLoginOpen={handleOpenLoginDialog}
			/>
			<DrawerComponent
				open={drawerOpen}
				handleClose={handleDrawerClose}
				setActivePage={setActivePage}
			/>
		</AppBar>
	);
};

export default Header;
