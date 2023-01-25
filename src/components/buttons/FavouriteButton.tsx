import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import "./ButtonComponents.css";
interface LikeButtonProps {
	isLiked: boolean;
	likeCount: number;
	handleClick: () => void;
}

const FavouriteButton = (props: LikeButtonProps) => {
	const { isLiked, likeCount, handleClick } = props;

	return (
		<div
			className="heart-btn"
			style={{
				display: "flex",
				minWidth: "max-content",
				marginRight: "20px",
				width: "100%",
				flexShrink: 0,
			}}
		>
			<div
				className={"content" + (isLiked ? " heart-active" : "")}
				onClick={handleClick}
				style={{
					display: "flex",
					margin: "4px 8px 4px 4px",
					alignItems: "center",
					boxSizing: "border-box",
					minWidth: "fit-content",
					flexShrink: 0,
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
							fontWeight: "500",
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
			</div>
		</div>
	);
};

export default FavouriteButton;
