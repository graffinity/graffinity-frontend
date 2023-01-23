import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";
import GraffitiAPI from "api/GraffitiPostAPI";
import CreateGrafiitiForm from "components/graffiti/CreateGraffitiForm";
import NotLoggedInComponent from "components/login/NotLoggedInComponent";
import { FormikValues } from "formik";
import IFile from "models/file/IFile";
import GraffitiRequest from "models/graffiti/GraffitiRequest";
import GraffitiStatus from "models/graffiti/GraffitiStatus";
import GraffitiPhotoRequest from "models/graffitiphoto/GraffitiPhotoRequest";
import { useAppSelector } from "redux/store/hooks";
import { getAddress } from "utils/LocationUtil";

const CreateGrafiitiPage = () => {
	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);

	const onSubmit = async (values: FormikValues) => {
		let file = values.file;
		let address = await getAddress(values.latitude, values.longitude);
		if (file) {
			let formData = new FormData();
			formData.append("file", file);
			let filename = file.name;

			let iFile: IFile = {
				originalname: filename,
				buffer: file,
				mimetype: file.type,
			};

			let graffitiReq: GraffitiRequest = {
				name: values.name,
				description: values.description,
				latitude: values.latitude,
				longitude: values.longitude,
				address: address,
				createdAt: new Date(),
				authorId: values.authorId,
				artistIds: values.authorId,
				status: GraffitiStatus.SUBMITTED,
				categoryIds: [],
			};

			let graffiti = await GraffitiAPI.create(graffitiReq);

			let request: GraffitiPhotoRequest = {
				file: iFile,
				graffitiId: graffiti.id,
				addedAt: new Date(),
			};
			formData.append("body", JSON.stringify(request));
			await GraffitiPhotoAPI.create(formData);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "24px",
				height: "100%",
				gap: "8px",
			}}
		>
			{isLoggedIn && <CreateGrafiitiForm handleSubmit={onSubmit} />}
			{!isLoggedIn && <NotLoggedInComponent />}
		</div>
	);
};

export default CreateGrafiitiPage;
