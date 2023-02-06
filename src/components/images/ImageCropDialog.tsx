import { Dialog } from "@mui/material";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Area, Point } from "react-easy-crop/types";
import "./ImageComponents.css";
interface ImageCropDialogProps {
	open: boolean;
	imgSrc: string;
	handleOpen: () => void;
	handleClose: () => void;
}

const ImageCropDialog = (props: ImageCropDialogProps) => {
	const [crop, setCrop] = useState<Point>(initialCropState);
	const [zoom, setZoom] = useState<number>(1);
	const onCropComplete = useCallback(
		(croppedArea: Area, croppedAreaPixels: Area) => {
			return croppedAreaPixels;
		},
		[]
	);
	return (
		<Dialog
			open={props.open}
			PaperProps={{
				style: {
					padding: "24px",
					boxSizing: "border-box",
				},
			}}
			onClose={props.handleClose}
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "100%",
			}}
		>
			<div className="crop-container">
				<Cropper
					image={props.imgSrc}
					crop={crop}
					zoom={zoom}
					aspect={1 / 1}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
			</div>
			<div></div>
		</Dialog>
	);
};

export interface CropState {
	x: number;
	y: number;
}

const initialCropState: CropState = {
	x: 0,
	y: 0,
};

export default ImageCropDialog;
