import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./Common.css";

const MultiActionAreaCard = () => (
	<Card
		className="card"
		sx={{
			background: "transparent",
			border: "none",
			boxShadow: "none",
			display: { xs: "none", md: "block" },
			ml: "16px",
		}}
	>
		<CardMedia component="img" src="graf.png" alt="graf logo" />
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
					letterSpacing: ".2rem",
				}}
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Laoreet non
				curabitur gravida arcu ac tortor dignissim convallis aenean. Aliquet
				risus feugiat in ante metus dictum. Eget lorem dolor sed viverra. Ac
				felis donec et odio pellentesque. Cursus turpis massa tincidunt dui ut.
				Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. In nisl
				nisi scelerisque eu ultrices. Consectetur adipiscing elit pellentesque
				habitant morbi tristique senectus et.
			</Typography>

			<Typography
				gutterBottom
				variant="h6"
				color="white"
				component="div"
				sx={{
					display: { md: "none", xs: "none", xl: "block" },
					fontSize: 24,
					textAlign: "center",
					letterSpacing: ".2rem",
				}}
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Laoreet non
				curabitur gravida arcu ac tortor dignissim convallis aenean. Aliquet
				risus feugiat in ante metus dictum. Eget lorem dolor sed viverra. Ac
				felis donec et odio pellentesque. Cursus turpis massa tincidunt dui ut.
				Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. In nisl
				nisi scelerisque eu ultrices. Consectetur adipiscing elit pellentesque
				habitant morbi tristique senectus et.
			</Typography>
		</CardContent>
	</Card>
);

export default MultiActionAreaCard;
