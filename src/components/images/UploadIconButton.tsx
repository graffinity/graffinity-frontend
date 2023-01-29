import { AddCircleOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ChangeEvent, useRef } from "react";
import "./ImageComponents.css";

interface UploadIconButtonProps {
	handleUpload: (file: File) => void;
}

const UploadIconButton = (props: UploadIconButtonProps) => {
	const { handleUpload } = props;

	const hiddenInputRef = useRef<HTMLInputElement | null>(null);

	const handleClick = (event: any) => {
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
			<IconButton className="hover-icon-effect" onClick={handleClick}>
				<AddCircleOutlined
					className="base-icon"
					style={{
						color: "#FFFFFF",
						height: "32px",
						width: "32px",
					}}
				/>
			</IconButton>
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
