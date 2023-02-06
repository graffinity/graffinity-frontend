import { DeleteForeverRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import AppTheme from "AppTheme";
import GraffitiPhotoResponse from "models/graffitiphoto/GraffitiPhotoResponse";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import cssimport { AddCircleOutlined } from "@mui/icons-material";
import { useAppSelector } from "redux/store/hooks";
import "./ButtonComponents.css";
import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";

interface DeleteIconButtonProps {
	graffitiPhoto: GraffitiPhotoResponse;
	disabled?: boolean;
}

const DeleteIconButton = (props: DeleteIconButtonProps) => {
	const { disabled } = props;
	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

	const handleClick = () => {
		confirmAlert({
			title: "Confirm to delete",
			message: "Are you sure you want do delete this picture?",
			buttons: [
				{
					label: "Yes",
					onClick: () => handleDelete(),
				},
				{
					label: "No",
					onClick: () => {},
				},
			],
		});
	};

	const handleDelete = async () => {
		let response = await GraffitiPhotoAPI.delete(props.graffitiPhoto.id);
		if (response) {
			console.log("deleted");
			window.location.reload();
		} else {
			alert("Something went wrong");
		}
	};

	return (
		<Tooltip title={"Delete this photo"} placement="bottom">
			<IconButton
				className="hover-icon-effect"
				disableTouchRipple
				onClick={isLoggedIn && !disabled ? () => handleClick() : () => {}}
				sx={{
					opacity: isLoggedIn ? 1 : 0.5,
					"&:hover": {
						cursor: isLoggedIn && !disabled ? "normal" : "not-allowed",
						boxShadow: `0 0 0 3px ${AppTheme.palette.red[200]}`,
					},
				}}
			>
				<DeleteForeverRounded
					className="base-icon"
					style={{
						color: AppTheme.palette.red[300],
						opacity: disabled ? 1 : 0.5,
						height: "32px",
						width: "32px",
					}}
					sx={{
						"&:hover": {
							cursor: isLoggedIn && !disabled ? "normal" : "not-allowed",
							boxShadow: `0 0 0 10px ${AppTheme.palette.red[400]} !important`,
							color: AppTheme.palette.red[400],
						},
					}}
				/>
			</IconButton>
		</Tooltip>
	);
};

export default DeleteIconButton;
