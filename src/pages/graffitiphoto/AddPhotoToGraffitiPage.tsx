import GraffitiAPI from "api/GraffitiPostAPI";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AddPhotoToGraffitiPage = () => {
	const { id } = useParams();

	const [graffiti, setGraffiti] = useState<GraffitiResponse | undefined>();

	useEffect(() => {
		console.log("graffitiId", id);
		getGraffiti();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getGraffiti = async () => {
		if (id) {
			let response = await GraffitiAPI.findById(+id);
			setGraffiti(response);
		}
		setGraffiti(undefined);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				width: "100%",
			}}
		>
			{graffiti && <div>Graffiti is here</div>}
		</div>
	);
};

export default AddPhotoToGraffitiPage;
