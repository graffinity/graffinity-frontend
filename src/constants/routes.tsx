import {
	AddCircleOutlineOutlined,
	AddPhotoAlternateRounded,
	CodeRounded,
	CollectionsRounded,
	FullscreenRounded,
	HomeRounded,
} from "@mui/icons-material";
import RouteGroup from "models/routes/RouteGroup";
import GraffitiFullView from "pages/GraffitiFullView/GraffitiFullView";
import GrafittiLibrary from "pages/GrafittyLibrary/GraffitiLibrary";
import CreateGrafiitiPage from "pages/creategraffiti/CreateGraffitiPage";
import AddPhotoToGraffitiPage from "pages/graffitiphoto/AddPhotoToGraffitiPage";
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
				icon: <HomeRounded />,
			},
			{
				path: "/graffiti/:id/photo/add",
				key: "graffiti-add-photo",
				pageTitle: "Add Photo To Graffiti",
				element: <AddPhotoToGraffitiPage />,
				icon: <AddPhotoAlternateRounded />,
			},
			{
				path: "/graffiti/create",
				key: "graffiti-create",
				pageTitle: "Create Graffiti",
				element: <CreateGrafiitiPage />,
				icon: <AddCircleOutlineOutlined />,
			},
			{
				path: "/graffiti/view/:id",
				key: "graffiti-view",
				pageTitle: "Full View",
				element: <GraffitiFullView />,
				icon: <FullscreenRounded />,
			},
			{
				path: "/graffiti/gallery",
				key: "graffiti-galerry",
				pageTitle: "Gallery",
				element: <GrafittiLibrary />,
				icon: <CollectionsRounded />,
			},
		],
	},
	{
		group: "Admin/Dev",
		items: [
			{
				path: "/sandbox",
				key: "sandbox",
				pageTitle: "Sandbox",
				element: <Sandbox />,
				icon: <CodeRounded />,
			},
		],
	},
];

export default routes;
