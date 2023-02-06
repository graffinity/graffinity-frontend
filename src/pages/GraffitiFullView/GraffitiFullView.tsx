import GraffitiAPI from "api/GraffitiAPI";
import FullViewDescription from "components/graffiti/FullViewDescription";
import ImageCropDialog from "components/images/ImageCropDialog";
import ImageSlider from "components/images/ImageSlider";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GraffitiFullView.css";

export default function GraffitiFullView() {
	const { id } = useParams();
	const [graffiti, setGraffiti] = useState<GraffitiResponse>();
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		getGraffiti();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const getGraffiti = async () => {
		if (id) {
			let response = await GraffitiAPI.findById(+id);
			setGraffiti(response);
		}
	};

	return (
		<div
			className="PeperStepper"
			style={{
				display: "flex",
				flexWrap: "wrap",
				overflow: "auto",
				gap: "32px",
			}}
		>
			<div
				className="PhotoContainer"
				style={{
					width: "calc(100%-128px)",

					flex: 2,
				}}
			>
				{graffiti && <ImageSlider graffiti={graffiti} />}
			</div>
			<div
				className="DescriptionContainer"
				style={{
					width: "calc(100%-128px)",
					flex: 1,
				}}
			>
				<FullViewDescription graffiti={graffiti} />
			</div>
			{graffiti && (
				<div
					style={{
						height: "80%",
					}}
				>
					<ImageCropDialog
						open={open}
						handleClose={handleClose}
						handleOpen={handleOpen}
						imgSrc={graffiti.photos[0].url}
					/>
				</div>
			)}
		</div>
	);
}
