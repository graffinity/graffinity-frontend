import Header from "components/common/Header";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import common from "redux/common";
import { useAppSelector } from "redux/store/hooks";
import "./AppRouter.css";
import { FooterContainer } from "./components/common/Footer";
import routes from "./constants/routes";
import RouteItem from "./models/routes/RouteItem";

const AppRouter = () => {
	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);
	const userInfo = useAppSelector((state) => state.common.userInfo);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [activePage, setActivePage] = useState<RouteItem>(routes[0].items[0]);

	const setActivePageHandler = (currentPage: RouteItem) => {
		setActivePage(currentPage);
	};

	useEffect(() => {
		common.getStatus();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		common.getStatus();
	}, [isLoggedIn]);

	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				height: "100%",
				flexDirection: "column",
			}}
		>
			<Header setActivePage={setActivePageHandler} />
			<div
				style={{
					width: "100%",
					display: "flex",
					flex: 1,
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
