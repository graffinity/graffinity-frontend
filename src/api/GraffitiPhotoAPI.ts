import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import GraffitiPhotoRequest from "models/graffitiphoto/GraffitiPhotoRequest";
import GraffitiPhotoResponse from "models/graffitiphoto/GraffitiPhotoResponse";

const baseUrl = apiEndpoints.graffitiPhoto;

const GraffitiPhotoAPI = {
	create: (formData: FormData): Promise<any> =>
		axios
			.post(baseUrl, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				console.log(response);
				return response.data;
			}),
};

export default GraffitiPhotoAPI;
