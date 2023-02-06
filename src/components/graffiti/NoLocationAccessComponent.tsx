import { Button, Typography } from "@mui/material";
import AppTheme from "AppTheme";
import common from "redux/common";

const NoLocationAccessComponent = () => {
	const requestLocationAccess = () => {
		common.getUserLocation();
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "60%",
				marginTop: "64px",
				marginBottom: "0px",
				padding: "36px",
				gap: "24px",
				border: "1px solid #FFFFFF",
				boxSizing: "border-box",
				borderRadius: "16px",
			}}
		>
			<Typography
				variant="h3"
				color={AppTheme.palette.grey[300]}
				align="center"
			>
				Please enable location access to in order see nearby graffitis...
			</Typography>
			<Typography
				variant="h5"
				color={AppTheme.palette.grey[200]}
				align="center"
			>
				You can enable location access in your browser settings.
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
						onClick={requestLocationAccess}
						variant="outlined"
						style={{
							padding: "16px 24px",
							borderColor: "white",
							width: "60%",
						}}
					>
						<Typography
							variant="h5"
							style={{
								color: "white",
								textTransform: "none",
								fontWeight: 600,
								fontSize: "1.2rem",
							}}
						>
							Request Location Access
						</Typography>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NoLocationAccessComponent;
