import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const MultiActionAreaCard = () => (
	<Card
		className='card'
		sx={{
			ml: "16px",
			background: "transparent",
			border: "none",
			boxShadow: "none",
		}}>
		<CardMedia component='img' src='graf.png' alt='graf logo' />
		<CardContent>
			<Typography
				gutterBottom
				variant='h6'
				component='div'
				sx={{
					display: { md: "block", xs: "none", xl: "none" },
					fontSize: 16,
					textAlign: "center",
					letterSpacing: ".2rem",
				}}>
				GRAFINITY UPLOAD YOUR BLALALALALALLALALA THEN OTHERS CAN
				BLALALALALALLA LORE BLA AND EXPLORE WILNO
			</Typography>
			<Typography
				gutterBottom
				variant='h6'
				component='div'
				sx={{
					display: { md: "none", xs: "block", xl: "none" },
					fontSize: 12,
					textAlign: "center",
					letterSpacing: ".1rem",
				}}>
				GRAFINITY UPLOAD YOUR BLALALALALALLALALA THEN OTHERS CAN
				BLALALALALALLA LORE BLA AND EXPLORE WILNO
			</Typography>
			<Typography
				gutterBottom
				variant='h6'
				component='div'
				sx={{
					display: { md: "none", xs: "none", xl: "block" },
					fontSize: 24,
					textAlign: "center",
					letterSpacing: ".2rem",
				}}>
				GRAFINITY UPLOAD YOUR BLALALALALALLALALA THEN OTHERS CAN
				BLALALALALALLA LORE BLA AND EXPLORE WILNO
			</Typography>
		</CardContent>
	</Card>
);

export default MultiActionAreaCard;
