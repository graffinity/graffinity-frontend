import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";

const baseUrl = apiEndpoints.graffitiPhoto;

const GraffitiPhotoAPI = {
	create: (formData: FormData): Promise<any> =>
		axios.post(baseUrl, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}),
};

export default GraffitiPhotoAPI;
