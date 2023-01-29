import { Box, Typography } from "@mui/material";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useNavigate } from "react-router-dom";

interface NearbyGraffitiListItemProps {
	graffiti: GraffitiResponse;
	distance?: number;
}

const NearbyGraffitiListItem = (props: NearbyGraffitiListItemProps) => {
	const { graffiti, distance } = props;
	const navigate = useNavigate();
	return (
		<Box
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				boxSizing: "border-box",
				borderRadius: "8px",
				margin: "20px 32px",
				minWidth: "200px",
				minHeight: "100px",
				maxHeight: "calc(100% - 48px)",
				width: "100%",

				boxShadow: " 0px 0px 4px rgba(255, 255, 255, 0.15)",
			}}
			sx={{
				":hover": {
					boxShadow: " 5px 6px 8px 4px rgba(255, 255, 255, 0.5) !important",
				},
			}}
		>
			<Box
				style={{
					display: "flex",
					flexDirection: "column",
					width: "calc(100% + 2px)",
					justifyContent: "center",
					alignItems: "center",
					border: "1px solid #FFFFFF",
					background:
						"linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.45) 100%)",
					boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
					borderRadius: "8px 8px 0px 0px",
					padding: "0px 12px",
					boxSizing: "border-box",
				}}
				sx={{
					"&:hover": {
						background:
							"linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.1) 100%) !important",
					},
				}}
			>
				<Typography
					variant="h6"
					align="left"
					sx={{
						flex: 3,
						fontWeight: "700",
						color: "#FFFFFF",

						// textAlign: "center",

						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
						fontSize: "24px",
						width: "100%",
						padding: "4px 12px 2px 12px",
					}}
				>
					{graffiti.name}
				</Typography>

				<Typography
					variant="h5"
					align="left"
					sx={{
						fontWeight: "500",
						color: "#FFFFFF",
						fontSize: "18px",

						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
						padding: "2px 8px 6px 8px",
						width: "100%",
					}}
				>
					{distance
						? `${distance}m away`
						: graffiti.distanceFromUser
						? `${graffiti.distanceFromUser}m away`
						: "150m tarkim"}
				</Typography>
			</Box>

			<Box
				className="nearby-graffitii-image"
				component={"img"}
				src={graffiti.photos[0].url}
				onClick={() => navigate(`/graffiti/view/${graffiti.id}`)}
				style={{
					borderRadius: "0px 0px 8px 8px",
					width: "100%",
					minWidth: "80px",
					border: "1px solid #FFFFFF",
					objectFit: "cover",
					aspectRatio: 1.1 / 1.25,
					opacity: 0.8,
					objectPosition: "center",
				}}
				sx={{
					":hover": {
						cursor: "pointer",
						opacity: "1 !important",
					},
				}}
			/>
		</Box>
	);
};

export default NearbyGraffitiListItem;
