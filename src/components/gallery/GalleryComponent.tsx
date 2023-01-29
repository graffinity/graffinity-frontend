import { Box, Typography } from "@mui/material";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./Gallery.css";

interface GalleryComponentProps {
	graffiti: GraffitiResponse;
}

const GalleryComponent = (props: GalleryComponentProps) => {
	const { graffiti } = props;
	const navigate = useNavigate();
	return (
		<div className="gallery-component-container" style={{}}>
			<Box
				className="image-container"
				sx={{
					":hover": {
						opacity: 0.8,
						cursor: "pointer",
					},
					minWidth: "220px",
				}}
				onClick={() => {
					navigate(`/graffiti/view/${graffiti.id}`);
				}}
			>
				{/* {graffiti.photos.map((photo) => (
					<img className="CardImage" src={photo.url} alt="GraffitiImage" />
				))} */}
				<Box
					component={"img"}
					style={{
						width: "100%",
						objectFit: "cover",
						overflowBlock: "hidden",
						maxHeight: "1280px",
						maxWidth: "1280px",
						aspectRatio: 1 / 1,
						minWidth: "120px",
					}}
					className="CardImage"
					src={graffiti.photos[0].url}
					alt="GraffitiImage"
				/>
			</Box>

			<div className="content-container">
				<Typography variant="h3" className="Title" color="#FFFFFF">
					{graffiti.name}
				</Typography>
				<Typography
					variant="body"
					className="Location"
					color="#FFFFFF"
					style={{
						marginBottom: "24px",
					}}
				>
					{graffiti.address}
				</Typography>
				<Typography variant="body" className="Description" color="#FFFFFF">
					{graffiti.description}
				</Typography>
				<Typography variant="body2" className="Date" color="#FFFFFF">
					{moment(graffiti.creationDate).format("YYYY/MM/DD")}
				</Typography>
			</div>
		</div>
	);
};

export default GalleryComponent;
