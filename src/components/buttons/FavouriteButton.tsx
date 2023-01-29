import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import "./ButtonComponents.css";
interface LikeButtonProps {
	isLiked: boolean;
	likeCount: number;
	handleClick: () => void;
	disabled?: boolean;
}

const FavouriteButton = (props: LikeButtonProps) => {
	const { isLiked, likeCount, disabled, handleClick } = props;

	return (
		<div
			className="heart-btn"
			style={{
				display: "flex",
				minWidth: "max-content",
				marginRight: "20px",
				width: "100%",
				flexShrink: 0,
				opacity: disabled ? 0.5 : 1,
			}}
		>
			<Box
				className={"content" + (isLiked && !disabled ? " heart-active" : "")}
				onClick={!disabled ? handleClick : () => {}} // if disabled, do nothing
				style={{
					display: "flex",
					margin: "4px 8px 4px 4px",
					alignItems: "center",
					boxSizing: "border-box",
					minWidth: "fit-content",
					flexShrink: 0,
				}}
				sx={{
					"&:hover": {
						cursor: disabled ? "not-allowed" : "normal",
						opacity: disabled ? 1 : 0.9,
					},
				}}
			>
				<div className={"heart" + (isLiked ? " heart-active" : "")}></div>
				<div
					className={"text" + (isLiked ? " heart-active" : "")}
					style={{
						flexWrap: "nowrap",
					}}
				>
					<Typography
						variant="body"
						color="inherit"
						className={"text" + (isLiked ? " heart-active" : "")}
						style={{
							fontWeight: "600",
							color: isLiked ? "#ffffff" : grey[200],

							boxSizing: "border-box",
							flexWrap: "nowrap",
						}}
					>
						Likes{" "}
					</Typography>
					<Typography
						variant="body"
						color="inherit"
						style={{
							padding: "8px 8px 0px 2px",
							boxSizing: "border-box",
							color: isLiked ? "#ffffff" : grey[200],
							fontWeight: "600",
							minWidth: "48px",
						}}
					>
						{likeCount}
					</Typography>
				</div>
				<div className={"numb" + (isLiked ? " heart-active" : "")}></div>
			</Box>
		</div>
	);
};

export default FavouriteButton;
