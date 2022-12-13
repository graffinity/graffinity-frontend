import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const MultiActionAreaCardMobile = () => (
	<Card
		className="card"
		sx={{
			background: "transparent",
			border: "none",
			boxShadow: "none",
			display: { xs: "block", md: "none" },
			margin: "0",
		}}
	>
		<CardMedia component="img" src="graf.png" alt="graf logo" />
		<CardContent>
			<Typography
				gutterBottom
				variant="h6"
				color="white"
				component="div"
				sx={{
					display: { md: "none", xs: "block", xl: "none" },
					fontSize: 13,
					textAlign: "center",
					letterSpacing: ".1rem",
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

export default MultiActionAreaCardMobile;
