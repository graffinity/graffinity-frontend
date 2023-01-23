interface RouteItem {
	path: string;
	key: string;
	element: JSX.Element;
	pageTitle?: string;
	icon?: JSX.Element;
	hide?: boolean;
	isForPublic?: boolean;
	isForAdmins?: boolean;
	isLink?: boolean;
}

export default RouteItem;
