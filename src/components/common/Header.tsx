import routes from "constants/routes";
import { ThemeProvider } from "@emotion/react";
import BrushIcon from "@mui/icons-material/Brush";
import { Link, Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { createTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import AppTheme from "AppTheme";

import { useNavigate } from "react-router-dom";

import "./Common.css";
import LoginDialog from "components/login/LoginDialog";
import { useState } from "react";
import AuthAPI from "api/AuthAPI";

const Header = () => {
	const navigate = useNavigate();
	const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);

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
		<AppBar position="static">
			<Toolbar
				disableGutters={true}
				style={{
					backgroundColor: "rgb(32, 32, 36)",
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
					<div style={{ marginLeft: "20px" }}>
						<Button
							variant={"text"}
							onClick={() => navigate("/pagalba")}
							style={{
								color: AppTheme.palette.primary.main,
							}}
						>
							help
						</Button>
					</div>

					<div>
						<Button onClick={handleOpenLoginDialog}>
							{/* <Avatar alt="Remy Sharp" src="https://i.imgur.com/0y0y0y0.png" /> */}
							<Typography>Login</Typography>
						</Button>
						<Button onClick={handleLogout}>
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
