import RouteGroup from "models/routes/RouteGroup";
import HomePage from "pages/home/HomePage";
import Sandbox from "pages/sandbox/Sandbox";

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
				pageTitle: "Sandbox",
				element: <Sandbox />,
			},
		],
	},
	{
		group: "Admin",
		items: [],
	},
];

export default routes;
