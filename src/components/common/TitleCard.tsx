import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./Common.css";

const TitleCard = () => (
	<Card
		className="card"
		style={{
			background: "transparent",
		}}
		sx={{
			border: "none",
			boxShadow: "none",
			display: { xs: "none", md: "block" },
			ml: "16px",
		}}
	>
		<div
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<CardMedia
				component="img"
				src="graf.png"
				alt="graf logo"
				style={{
					width: "50%",
					height: "50%",
				}}
			/>
		</div>
		<CardContent>
			<Typography
				gutterBottom
				variant="h6"
				component="div"
				color="white"
				sx={{
					display: { md: "block", xs: "none", xl: "none" },
					fontSize: 14,
					textAlign: "center",
				}}
			>
				Discover the world of graffiti at our virtual library! Explore
				collections of street art and murals from around the world. From classic
				spray-painted pieces to professional artwork, we have it all. Our
				website features a vast gallery of images. Stay inspired and connected
				with our community of graffiti enthusiasts. Explore the city from a
				different perspective. Share your own creations or other noteworthy
				pieces you notice on the street and help build this community.
			</Typography>
		</CardContent>
	</Card>
);

export default TitleCard;
