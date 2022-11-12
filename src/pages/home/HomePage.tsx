/* eslint-disable @typescript-eslint/no-unused-vars */
import MultiActionAreaCard from "components/common/Card";
import MapComponent from "components/map/MapComponent";
import { loadMapApi } from "components/utils/GoogleMapsUtils";
import { useEffect, useState } from "react";
import "./HomePage.css";

const HomePage = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [height, setHeight] = useState<number>(window.innerHeight);

	window.addEventListener("resize", () => {
		setWidth(window.innerWidth);
	});
	window.addEventListener("resize", () => {
		setHeight(window.innerHeight);
	});

	const [scriptLoaded, setScriptLoaded] = useState(false);
	useEffect(() => {
		const googleMapScript = loadMapApi();
		googleMapScript.addEventListener("load", function () {
			setScriptLoaded(true);
		});
	}, []);

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}>
			<div className='homepage-container'>
				<div className='left'>
					<MultiActionAreaCard />
				</div>

				<div className='right'>
					{scriptLoaded && (
						<MapComponent
							mapType={google.maps.MapTypeId.ROADMAP}
							mapTypeControl={true}
							width={width}
							height={height}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
function setHeight(innerHeight: number) {
	throw new Error("Function not implemented.");
}
