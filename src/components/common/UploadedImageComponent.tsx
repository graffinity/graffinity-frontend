import { CancelOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";

interface UploadedImageComponentProps {
	image: File;
	onRemove: (image: File) => void;
}

const UploadedImageComponent = (props: UploadedImageComponentProps) => {
	const { image, onRemove } = props;
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "center",
				boxSizing: "border-box",
				padding: "16px",
				border: "1px solid #fff",
				borderRadius: "8px",
				gap: "6px",
				width: "100%",
				maxWidth: "160px",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "flex-start",
				}}
			>
				<img
					src={URL.createObjectURL(image)}
					alt="uploaded"
					style={{
						width: "120px",
						height: "120px",
						opacity: "0.85",
					}}
				/>
				<IconButton
					style={{
						marginLeft: "-40px",
						padding: "8px",
					}}
					focusRipple
					onClick={() => onRemove(image)}
				>
					<CancelOutlined
						style={{
							color: "#FFFFFF",
						}}
					/>
				</IconButton>
			</div>
			<div
				style={{
					textOverflow: "ellipsis",
					overflow: "hidden",
					whiteSpace: "break-spaces",
					width: "100%",
				}}
			>
				<Typography
					variant="body2"
					color="#FFFFFF"
					noWrap={image.name.length > 20}
					style={{
						fontWeight: "600",
						padding: "4px",
						width: "100%",
						whiteSpace: "break-spaces",
					}}
				>
					{image.name}
				</Typography>
			</div>
		</div>
	);
};

export default UploadedImageComponent;
