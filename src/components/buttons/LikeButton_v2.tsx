import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Typography } from "@mui/material";
interface LikeButtonProps {
	likeCount: number;
	isLiked: boolean;
}

const LikeButton_v2 = (props: LikeButtonProps) => {
	// const { likeCount, isLiked } = props;
	return (
		<div>
			<IconButton
				style={{
					// height: 32,
					// width: 32,
					backgroundColor: "white",
				}}
			>
				<FavoriteIcon
					style={{
						height: 32,
						width: 32,
						color: "red",
					}}
				/>
				<Typography variant="h2" fontSize={12} style={{}}></Typography>
			</IconButton>
		</div>
	);
};

export default LikeButton_v2;
