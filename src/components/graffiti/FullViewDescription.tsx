import { Typography } from "@mui/material";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import moment from "moment";

interface DescriptionProps {
	graffiti?: GraffitiResponse;
}

const FullViewDescription = (props: DescriptionProps) => {
	const { graffiti } = props;
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				width: "100%",
				marginTop: "48px",
				marginRight: "16px",
				justifyContent: "space-between",
				borderRadius: "16px",
				height: "calc(100% - 16px)",
				minWidth: "360px",
			}}
		>
			<div
				style={{
					display: "flex",
					border: "1px solid #FFFFFF",
					borderRadius: "16px",
					padding: "16px",
					boxSizing: "border-box",
					height: "100%",
					marginBottom: "32px",
					width: "100%",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<div>
					<Typography
						variant="h2"
						style={{
							color: "white",
						}}
					>
						{graffiti?.name}
					</Typography>
					<Typography
						variant="body2"
						style={{
							color: "white",
							marginBottom: "36px",
							fontStyle: "italic",
						}}
					>
						{graffiti?.address}
					</Typography>
					<Typography
						variant="body"
						style={{
							color: "white",
							marginBottom: "24x",
						}}
					>
						{graffiti?.description}
					</Typography>
				</div>
				<Typography
					variant="h6"
					style={{
						color: "white",
					}}
				>
					Created at: {moment(graffiti?.creationDate).format("YYYY/MM/DD")}
				</Typography>
			</div>
		</div>
	);
};

export default FullViewDescription;
