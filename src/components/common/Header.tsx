import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import BrushIcon from "@mui/icons-material/Brush";
import { Toolbar } from "@mui/material";
import { useState } from "react";

const theme = createTheme({
	palette: {
		primary: {
			main: "#19706D",
		},
	},
});

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
	const [, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<ThemeProvider theme={theme}>
			<AppBar position='static' sx={{ borderRadius: "0 0 20px 20px" }}>
				<Toolbar
					disableGutters
					style={{
						display: "flex",
						justifyContent: "space-between",
						gap: "10px",
					}}
					sx={{
						padding: "0px 32px",
					}}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							width: "100%",
						}}></div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
						}}>
						<BrushIcon
							sx={{
								display: {
									xs: "block",
									md: "flex",
									fontSize: "small",
								},
							}}
						/>
						<Typography
							variant='h3'
							noWrap
							component='a'
							href='/'
							sx={{
								display: { xs: "none", md: "flex" },
								fontFamily: "Times, Times New Roman, serif",
								fontWeight: 300,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}>
							GRAFFINITY
						</Typography>
						<Typography
							textAlign='center'
							variant='h5'
							noWrap
							component='a'
							href=''
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontFamily: "Times, Times New Roman, serif",
								fontWeight: 200,
								fontSize: 20,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}>
							GRAFFINITY
						</Typography>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							width: "100%",
						}}>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title='Open settings'>
								<IconButton
									onClick={handleOpenUserMenu}
									sx={{ p: 0 }}>
									<Avatar
										alt='Remy Sharp'
										src='/static/images/avatar/2.jpg'
									/>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id='menu-appbar'
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}>
								{settings.map((setting) => (
									<MenuItem
										key={setting}
										onClick={handleCloseUserMenu}>
										<Typography textAlign='center'>
											{setting}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
};
export default Header;
