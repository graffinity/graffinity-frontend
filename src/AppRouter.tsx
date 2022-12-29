import Header from "components/common/Header";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./AppRouter.css";
import { FooterContainer } from "./components/common/Footer";
import NavBar from "./components/common/NavBar";
import routes from "./constants/routes";
import RouteItem from "./models/routes/RouteItem";

const AppRouter = () => {
	useEffect(() => {
		// common.getStatus();
	}, []);

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<NavBar />
			<Header />
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
