import { AddCircleOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { ChangeEvent, useRef } from "react";
import { useAppSelector } from "redux/store/hooks";
import "./ButtonComponents.css";

interface UploadIconButtonProps {
	handleUpload: (file: File) => void;
}

const UploadIconButton = (props: UploadIconButtonProps) => {
	const { handleUpload } = props;
	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

	const hiddenInputRef = useRef<HTMLInputElement | null>(null);

	const handleClick = () => {
		hiddenInputRef.current?.click();
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			let image = e.target.files[0];

			handleUpload(image);
		}
	};

	return (
		<>
			<Tooltip
				title={isLoggedIn ? "" : "Please log in upload a photo"}
				placement="bottom"
			>
				<IconButton
					className="hover-icon-effect"
					disableTouchRipple
					onClick={isLoggedIn ? () => handleClick() : () => { }}
					sx={{
						opacity: isLoggedIn ? 1 : 0.5,
					}}
				>
					<AddCircleOutlined
						className="base-icon"
						style={{
							color: "#FFFFFF",
							height: "32px",
							width: "32px",
						}}
						sx={{
							"&:hover": {
								cursor: !isLoggedIn ? "not-allowed" : "normal",
								boxShadow: isLoggedIn
									? "0 0 0 10px rgba(0, 0, 0, 0.4) !important"
									: "0 0 0 10px rgba(229, 57, 53, 0.4) !important",
								color: isLoggedIn
									? "#FFFFFF"
									: "rgba(229, 57, 53, 0.55) !important",
							},
						}}
					/>
				</IconButton>
			</Tooltip>
			<input
				alt="Upload Image"
				accept="image/*"
				type="file"
				onChange={handleFileChange}
				ref={hiddenInputRef}
				style={{ display: "none" }}
			/>
		</>
	);
};

export default UploadIconButton;
