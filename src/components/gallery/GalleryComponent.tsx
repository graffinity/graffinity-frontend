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
		<div className="gallery-component-container">
			<Box
				className="image-container"
				sx={{
					":hover": {
						opacity: 0.8,
						cursor: "pointer",
					},
				}}
				onClick={() => {
					navigate(`/graffiti/view/${graffiti.id}`);
				}}
			>
				{/* {graffiti.photos.map((photo) => (
					<img className="CardImage" src={photo.url} alt="GraffitiImage" />
				))} */}
				<img
					style={{
						width: "100%",
					}}
					width={1000}
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
