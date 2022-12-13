/* eslint-disable @typescript-eslint/no-unused-vars */
import MultiActionAreaCard from "components/common/Card";
import MapComponent from "components/map/MapComponent";
import { useState } from "react";
import "./HomePage.css";

const maxWidth4DesktopView = 900;

const HomePage = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [height, setHeight] = useState<number>(window.innerHeight);

	window.addEventListener("resize", () => {
		setWidth(window.innerWidth);
	});
	window.addEventListener("resize", () => {
		setHeight(window.innerHeight);
	});

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div className="homepage-container">
				<div className="left">
					<MultiActionAreaCard />
				</div>

				<div className="right">
					<MapComponent
						width={width >= maxWidth4DesktopView ? width / 1.6 : width}
						height={height / 1.25}
					/>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
function setHeight(innerHeight: number) {
	throw new Error("Function not implemented.");
}
