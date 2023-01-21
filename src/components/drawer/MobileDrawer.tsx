import { Global } from "@emotion/react";
import { Menu } from "@mui/icons-material";
import { Box, IconButton, SwipeableDrawer, styled } from "@mui/material";
import grey from "@mui/material/colors/grey";

interface MobileDrawerProps {
	open: boolean;
	handleClose: () => void;
	handleOpen: () => void;
	children: React.ReactNode;
}

const drawerBleeding = 56;

const MobileDrawer = (props: MobileDrawerProps) => {
	const Puller = styled(Box)(({ theme }) => ({
		width: 30,
		height: 6,
		backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
		borderRadius: 3,
		position: "absolute",
		top: 8,
		left: "calc(50% - 15px)",
	}));
	const Root = styled("div")(({ theme }) => ({
		height: "100%",
		background: "transparent",
	}));

	const StyledBox = styled(Box)(({ theme }) => ({
		backgroundColor: `#404044`,
	}));

	const { open, handleOpen, handleClose } = props;
	return (
		<Root>
			<Global
				styles={{
					".MuiDrawer-root > .MuiPaper-root": {
						height: `calc(95% - ${drawerBleeding}px)`,
						overflow: "visible",
					},
				}}
			/>
			<IconButton sx={{ color: "white" }} onClick={handleOpen}>
				<Menu />
			</IconButton>
			<SwipeableDrawer
				anchor="bottom"
				open={open}
				onClose={handleClose}
				onOpen={handleOpen}
				swipeAreaWidth={drawerBleeding}
				disableSwipeToOpen={true}
				ModalProps={{
					keepMounted: true,
				}}
			>
				<Puller />
				<StyledBox
					sx={{
						px: 2,
						pb: 2,
						height: "100%",
						overflow: "auto",
					}}
				></StyledBox>
			</SwipeableDrawer>
		</Root>
	);
};

export default MobileDrawer;
