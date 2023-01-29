import { Drawer } from "@mui/material";
import Box from "@mui/material/Box";
import routes from "constants/routes";
import RouteItem from "models/routes/RouteItem";

import { DrawerList } from "./DrawerList";

const drawerWidth = 280;

interface DrawerProps {
	open: boolean;
	handleClose: () => void;
	setActivePage: (currentPage: RouteItem) => void;
	children?: React.ReactNode;
}

const DrawerComponent = (props: DrawerProps) => {
	const { open, handleClose, setActivePage } = props;

	return (
		<Box sx={{ display: "flex" }}>
			<Drawer
				disableScrollLock={true}
				open={open}
				onClose={handleClose}
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				anchor="left"
			>
				<Box>
					<DrawerList
						pathItems={routes}
						setActivePage={setActivePage}
						handleClose={handleClose}
					/>
				</Box>
			</Drawer>
		</Box>
	);
};

export default DrawerComponent;
