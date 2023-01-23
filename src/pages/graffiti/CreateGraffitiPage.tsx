import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";
import GraffitiAPI from "api/GraffitiPostAPI";
import CreateGrafiitiForm from "components/graffiti/CreateGraffitiForm";
import { FormikValues } from "formik";
import IFile from "models/file/IFile";
import GraffitiRequest from "models/graffiti/GraffitiRequest";
import GraffitiStatus from "models/graffiti/GraffitiStatus";
import GraffitiPhotoRequest from "models/graffitiphoto/GraffitiPhotoRequest";
import { getAddress } from "utils/LocationUtil";

const CreateGrafiitiPage = () => {
	const onSubmit = async (values: FormikValues) => {
		let file = values.file;
		let address = await getAddress(values.latitude, values.longitude);
		if (file) {
			let url = URL.createObjectURL(file);
			let formData = new FormData();
			formData.append("file", file);
			let filename = file.name;

			let iFile: IFile = {
				originalname: filename,
				buffer: file,
				mimetype: file.type,
			};

			let request: GraffitiPhotoRequest = {
				file: iFile,
				graffitiId: 1,
				url: url,
				userId: 1,
				addedAt: new Date(),
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
			formData.append("body", JSON.stringify(request));

			await GraffitiAPI.create(graffitiReq);
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
			<CreateGrafiitiForm handleSubmit={onSubmit} />
		</div>
	);
};

export default CreateGrafiitiPage;
