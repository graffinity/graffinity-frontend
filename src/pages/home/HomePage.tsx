/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "@mui/system";
import MultiActionAreaCard from "components/common/Card";
import MapComponent from "components/map/MapComponent";
import { useEffect, useRef, useState } from "react";
import "./HomePage.css";

const HomePage = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [height, setHeight] = useState<number | null>(null);

	window.addEventListener("resize", () => {
		setWidth(window.innerWidth);
	});
	window.addEventListener("resize", () => {
		if (containerRef.current) {
			setHeight(containerRef.current.clientHeight);
			return;
		}
		setHeight(window.innerHeight);
		console.log("height", height);
	});

	useEffect(() => {
		if (containerRef.current) {
			setHeight(containerRef.current.clientHeight);
			return;
		}
	}, []);

	const [scriptLoaded, setScriptLoaded] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

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

				<Container
					ref={containerRef}
					className='right'
					style={{
						height: "100%",
						maxWidth: "50vw",
					}}>
					<MapComponent width={width} height={height} />
				</Container>
			</div>
		</div>
	);
};

export default HomePage;
function setHeight(innerHeight: number) {
	throw new Error("Function not implemented.");
}
