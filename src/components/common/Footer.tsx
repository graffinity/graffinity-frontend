import { AppBar } from "@mui/material";
import { ReactComponent as GraffinityLogo } from "../../assets/svg/graffinity-logo.svg";
import "./Common.css";

export function FooterContainer() {
	return (
		<AppBar
			position="static"
			color="primary"
			style={{
				width: "100%",
				bottom: "0",
				background: "#202024",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					padding: "8px 0px",
					boxSizing: "border-box",
				}}
			>
				<GraffinityLogo
					style={{
						maxWidth: "45%",
						width: "45%",
						height: "auto",
					}}
				/>
			</div>
		</AppBar>
	);
}
