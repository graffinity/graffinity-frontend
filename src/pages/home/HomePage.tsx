/* eslint-disable @typescript-eslint/no-unused-vars */
import MultiActionAreaCard from "components/common/Card";
import Map from "components/map/Map";
import { FooterContainer } from "Containers/footerContainer";

const HomePage = () => {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}>
			<div className='bg-primary'>
				<div className='row g-0 bg-transparent '>
					<div className='col bg-transparent d-flex justify-content-center '>
						<div className='leftSide'>
							<MultiActionAreaCard />
						</div>
					</div>

					<div className='col d-flex justify-content-center align-items-center '>
						<div className='rightSide'>{/* <Map /> */}</div>
					</div>
				</div>
				<Map />
				<FooterContainer />
			</div>
		</div>
	);
};

export default HomePage;
