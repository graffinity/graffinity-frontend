import HeaderNew from "components/common/HeaderNew";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./AppRouter.css";
import "./AppRouter.css";
import { FooterContainer } from "./components/common/Footer";
import routes from "./constants/routes";
import RouteItem from "./models/routes/RouteItem";
import AuthAPI from "api/AuthAPI";

const AppRouter = () => {
	useEffect(() => {
		// common.getStatus();
		getProfile();
	}, []);

	const getProfile = async () => {
		let res = await AuthAPI.getProfile();
		if (res) {
			console.log("profile", res);
		}
	};

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{/* <NavBar /> */}
			<HeaderNew />
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Routes>
					{[...routes[0].items, ...routes[1].items].map((route: RouteItem) => (
						<Route key={route.key} path={route.path} element={route.element} />
					))}
				</Routes>
			</div>
			<FooterContainer />
		</div>
	);
};

export default AppRouter;
