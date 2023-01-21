import AuthAPI from "api/AuthAPI";
import HeaderNew from "components/common/Header";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import common from "redux/common";
import { useAppSelector } from "redux/store/hooks";
import "./AppRouter.css";
import { FooterContainer } from "./components/common/Footer";
import routes from "./constants/routes";
import RouteItem from "./models/routes/RouteItem";

const AppRouter = () => {
	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

	useEffect(() => {
		common.getStatus();
		if (isLoggedIn) {
			getProfile();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isLoggedIn) {
			getProfile();
		}
	}, [isLoggedIn]);

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
				display: "flex",
				height: "100%",
				flexDirection: "column",
			}}
		>
			<HeaderNew />
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
