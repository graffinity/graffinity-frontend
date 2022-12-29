import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import AppTheme from "AppTheme";

import { useNavigate } from "react-router-dom";

import "./Common.css";

const Header = () => {
	const navigate = useNavigate();

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
						<Button>
							{/* <Avatar alt="Remy Sharp" src="https://i.imgur.com/0y0y0y0.png" /> */}
							<Typography>Login</Typography>
						</Button>

						{/* <AccountInfo me={me} logoff={logoff} /> */}
					</div>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
