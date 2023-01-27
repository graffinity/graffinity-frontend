import GraffitiAPI from "api/GraffitiPostAPI";
import LibraryComponent from "components/gallery/GalleryComponent";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useState } from "react";
import "./GrafittiLibrary.css";
export default function GraffitiLibrary() {
	const [graffitis, setGraffitis] = useState<GraffitiResponse[]>([]);

	useEffect(() => {
		getGraffitis();
	}, []);

	const getGraffitis = async () => {
		let response = await GraffitiAPI.findAll();
		setGraffitis(response);
	};

	return (
		<div className="gallery-container">
			{graffitis.map((graffiti) => (
				<LibraryComponent key={graffiti.id} graffiti={graffiti} />
			))}
		</div>
	);
}
