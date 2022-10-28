import "./AppRouter.css";

import HomePage from "pages/home/HomePage";

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
		</div>
	);
};

export default AppRouter;
