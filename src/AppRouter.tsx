import "./AppRouter.css";

import MultiActionAreaCard from "components/common/Card";
import Header from "components/common/Header";
import Map from "components/map/Map";
import { FooterContainer } from "Containers/footerContainer";

const AppRouter = () => {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}>
			{/* <HomePage /> */}
			<>
				<div className='bg-primary'>
					<Header />
					<div className='row g-0 bg-transparent '>
						<div className='col bg-transparent d-flex justify-content-center '>
							<div className='leftSide'>
								<MultiActionAreaCard />
							</div>
						</div>

						<div className='col d-flex justify-content-center align-items-center '>
							<div className='rightSide'>
								<Map />
							</div>
						</div>
					</div>
					<FooterContainer />
				</div>
			</>
		</div>
	);
};

export default AppRouter;
