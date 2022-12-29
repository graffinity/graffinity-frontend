import { Button, Typography } from "@mui/material";
import { useState } from "react";

const PlaygroundPage = () => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Button>
				<Typography variant="h4">Login</Typography>
			</Button>
		</div>
	);
};

export default PlaygroundPage;
