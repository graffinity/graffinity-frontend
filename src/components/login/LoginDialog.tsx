import { Button, Dialog, Typography } from "@mui/material";

interface LoginDialogProps {
	open: boolean;
	handleClose: () => void;
}

const LoginDialog = (props: LoginDialogProps) => {
	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<div>
				<Button variant="contained" color="primary">
					<Typography variant="body">Login</Typography>
				</Button>
			</div>
		</Dialog>
	);
};

export default LoginDialog;
