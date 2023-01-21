import LibraryComponent from "components/gallery/GalleryComponent";
import data from "components/images/imagesTesting";
import "./GrafittiLibrary.css";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { useEffect, useState } from "react";
import GraffitiPostAPI from "api/GraffitiPostAPI";
export default function GraffitiLibrary() {
	const [graffitis, setGraffitis] = useState<GraffitiResponse[]>([]);

	useEffect(() => {
		getGraffitis();
	}, []);

	const getGraffitis = async () => {
		let response = await GraffitiPostAPI.findAll();
		setGraffitis(response);
	};

	const card = data.map((item) => {
		return (
			<div className="GridContainer">
				{/* {graffitis=}
				<LibraryComponent
					img={item.imageUrl}
					location={item.location}
					title={item.title}
					startDate={item.startDate}
					description={item.description}
				/> */}
			</div>
		);
	});
	return <div className="GridContainer">{card}</div>;
}
