import { useJsApiLoader } from "@react-google-maps/api";
import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";
import GraffitiAPI from "api/GraffitiAPI";
import CreateGrafiitiForm from "components/graffiti/CreateGraffitiForm";
import NotLoggedInComponent from "components/login/NotLoggedInComponent";
import { googleDefaultConfig } from "constants/googleDefaultConfig";
import GraffitiRequest from "models/graffiti/GraffitiRequest";
import GraffitiStatus from "models/graffiti/GraffitiStatus";
import GraffitiPhotoRequest from "models/graffitiphoto/GraffitiPhotoRequest";
import { useAppSelector } from "redux/store/hooks";
import { getAddress } from "utils/LocationUtil";

const CreateGrafiitiPage = () => {
	const isLoggedIn = useAppSelector((state) => state.common.isLoggedIn);
	const { isLoaded } = useJsApiLoader({
		...googleDefaultConfig,
	});

	const onSubmit = async (values: any) => {
		let file = values.file;

		const google = window.google;
		const geocoder = new google.maps.Geocoder();
		let address = await getAddress(geocoder, values.latitude, values.longitude);

		if (file) {
			let formData = new FormData();
			formData.append("file", file);

			let artistCheckId = values.artistId === "Unkown" ? [] : [values.artistId];

			let graffitiReq: GraffitiRequest = {
				name: values.name,
				description: values.description,
				latitude: values.latitude,
				longitude: values.longitude,
				address: address,
				createdAt: new Date(),
				authorId: 1,
				artistIds: artistCheckId,
				status: GraffitiStatus.SUBMITTED,
				categoryIds: [],
			};

			let graffiti = await GraffitiAPI.create(graffitiReq);

			let request: GraffitiPhotoRequest = {
				graffitiId: graffiti.id,
				addedAt: new Date(),
			};
			formData.append("body", JSON.stringify(request));
			let res = await GraffitiPhotoAPI.create(formData);
			if (res) {
				window.location.href = "/graffiti/view/" + graffiti.id;
			}
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
			{isLoaded && (
				<>
					{isLoggedIn && <CreateGrafiitiForm handleSubmit={onSubmit} />}
					{!isLoggedIn && <NotLoggedInComponent />}
				</>
			)}
		</div>
	);
};

export default CreateGrafiitiPage;
