import GraffitiResponse from "models/graffiti/GraffitiResponse";

interface GraffitiGalleryComponentProps {
	graffiti: GraffitiResponse;
}

const GraffitiGalleryComponent = (props: GraffitiGalleryComponentProps) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "100%",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-evenly",
					alignItems: "center",
					width: "100%",
				}}
			>
				<div
					aria-label="Graffiti Image"
					style={{
						flex: 2,
					}}
				>
					<div aria-label="Graffiti info"></div>
				</div>
			</div>
		</div>
	);
};

export default GraffitiGalleryComponent;
