/* eslint-disable @typescript-eslint/no-unused-vars */
import RouteGroup from "models/routes/RouteGroup";
import PlaygroundPage from "pages/auth/Playground";
import SignupPage from "pages/auth/SignupPage";
import CreateGrafiitiPage from "pages/graffiti/CreateGraffitiPage";
import GraffitiFullView from "pages/GraffitiFullView/GraffitiFullView";
import HomePage from "pages/home/HomePage";
import Sandbox from "pages/sandbox/Sandbox";
import GrafittiLibrary from "pages/GrafittyLibrary/GraffitiLibrary";
const routes: RouteGroup[] = [
	{
		group: "Menu",
		items: [
			{
				path: "/",
				key: "home",
				pageTitle: "Home",
				element: <HomePage />,
			},
			{
				path: "/sandbox",
				key: "sandbox",
				pageTitle: "Upload",
				element: <Sandbox />,
			},
			// {
			// 	path: "/playground",
			// 	key: "playground",
			// 	pageTitle: "Playground",
			// 	element: <PlaygroundPage />,
			// },
			// {
			// 	path: "/signup",
			// 	key: "signup",
			// 	pageTitle: "Signup",
			// 	element: <SignupPage />,
			// },
			{
				path: "/graffiti/create",
				key: "graffiti-create",
				pageTitle: "Create Graffiti",
				element: <CreateGrafiitiPage />,
			},
			{
				path: "/graffiti/view",
				key: "graffiti-view",
				pageTitle: "Full View",
				element: <GraffitiFullView />,
			},
			{
				path: "/graffiti/gallery",
				key: "graffiti-galerry",
				pageTitle: "Gallery",
				element: <GrafittiLibrary />,
			},
		],
	},
	{
		group: "Admin",
		items: [],
	},
];

export default routes;
