import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { useState } from "react";
import FormTextField from "./FormTextField";

interface ReadableHiddenPasswordFieldProps {
	title?: string;
	autoComplete?: string;
	name: string;
	className?: string;
	enableEnterSubmit?: boolean;
	enterSubmitAction?: () => void;
	inputRef?: React.RefObject<HTMLInputElement>;
}

const ReadableHiddenPasswordField = ({
	inputRef,
	title,
	autoComplete = "off",
	name,
	className,
	enableEnterSubmit,
	enterSubmitAction,
}: ReadableHiddenPasswordFieldProps) => {
	const [hidden, setHidden] = useState<boolean>(true);
	const changeVisibility = () => setHidden(!hidden);

	return (
		<FormTextField
			title={title}
			name={name}
			inputRef={inputRef}
			type={hidden ? "password" : "text"}
			autoComplete={autoComplete}
			enableEnterSubmit={enableEnterSubmit}
			enterSubmitAction={enterSubmitAction}
			className={className}
			endIcon={
				<IconButton onClick={changeVisibility}>
					{hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
				</IconButton>
			}
		/>
	);
};

export default ReadableHiddenPasswordField;
