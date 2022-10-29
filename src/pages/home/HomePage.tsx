/* eslint-disable @typescript-eslint/no-unused-vars */
import MultiActionAreaCard from "components/common/Card";
import MapComponent from "components/map/MapComponent";
import { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);

	window.addEventListener("resize", () => {
		setWidth(window.innerWidth);
	});

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
					<MapComponent width={width / 2} />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
