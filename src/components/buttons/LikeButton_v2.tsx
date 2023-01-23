import { FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface LikeButtonProps {}

const LikeButton_v2 = (props: LikeButtonProps) => {
	return (
		<div>
			<IconButton>
				<FavoriteBorder />
			</IconButton>
		</div>
	);
};

export default LikeButton_v2;
