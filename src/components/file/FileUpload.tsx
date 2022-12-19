import { ChangeEvent, useState } from "react";

const FileUpload = () => {
	const [file, setFile] = useState<File>();

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	const handleUploadClick = () => {
		if (!file) {
			return;
		}
	};
	return <div></div>;
};

export default FileUpload;
