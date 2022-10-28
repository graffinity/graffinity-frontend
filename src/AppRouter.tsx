import "./AppRouter.css";

import HomePage from "pages/home/HomePage";
import ResponsiveAppBar from "components/common/Header";
import Map from "components/Map/Map";
import { FooterContainer } from "Containers/footerContainer";
import MultiActionAreaCard from "components/common/Card";

const AppRouter = () => {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}>
			<HomePage />
			<>
				<div className='bg-primary'>
					<ResponsiveAppBar />
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
