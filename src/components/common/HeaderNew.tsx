import {
	AppBar,
	Button,
	IconButton,
	Link,
	List,
	Menu,
	Toolbar,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthAPI from "api/AuthAPI";
import LoginDialog from "components/login/LoginDialog";
import { useState } from "react";
import "./Common.css";
import routes from "constants/routes";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
const Header = () => {
	const navigate = useNavigate();
	const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
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
						aria-controls={open ? "basic-menu" : undefined}
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						onClick={handleClick}
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Menu
						sx={{
							display: "flex",
							alignContent: "center",
							justifyContent: "center",
						}}
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
					>
						<List
							style={{
								marginLeft: "16px",
								marginRight: "16px",
								width: "100%",
								display: "flex",
								alignContent: "center",
								justifyContent: "center",
								flexDirection: "column",
								gap: "12px",
							}}
						>
							{[...routes[0].items, ...routes[1].items].map((item) => (
								<Link
									sx={{ color: "black" }}
									underline="none"
									key={item.key}
									href={item.path}
								>
									{item.pageTitle}
								</Link>
							))}
						</List>
						<Button
							variant={"text"}
							onClick={() => navigate("/pagalba")}
							// style={{
							// 	color: AppTheme.palette.primary.main,
							// }}
							sx={{ color: "black" }}
						>
							help
						</Button>
					</Menu>

					<div style={{ marginLeft: "20px" }}></div>

					<div>
						<Button onClick={handleOpenLoginDialog} sx={{ color: "white" }}>
							{/* <Avatar alt="Remy Sharp" src="https://i.imgur.com/0y0y0y0.png" /> */}
							<Typography>Login</Typography>
						</Button>
						<Button onClick={handleLogout} sx={{ color: "white" }}>
							<Typography>Logout</Typography>
						</Button>

						{/* <AccountInfo me={me} logoff={logoff} /> */}
					</div>
				</div>
			</Toolbar>
			<LoginDialog
				open={loginDialogOpen}
				handleClose={handleCloseLoginDialog}
			/>
		</AppBar>
	);
};

export default Header;
