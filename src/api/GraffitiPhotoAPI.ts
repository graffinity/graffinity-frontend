import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import GraffitiPhotoResponse from "models/graffitiphoto/GraffitiPhotoResponse";

const baseUrl = apiEndpoints.graffitiPhoto;

const GraffitiPhotoAPI = {
	findAll: (): Promise<GraffitiPhotoResponse[]> => axios.get(baseUrl),
	findById: (id: number): Promise<GraffitiPhotoResponse> =>
		axios.get(`${baseUrl}/${id}`),
	create: (request: FormData): Promise<GraffitiPhotoResponse> =>
		axios.post(baseUrl, request, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}),
	// delete this method ?
	update: (id: number, request: FormData): Promise<GraffitiPhotoResponse> =>
		axios.put(`${baseUrl}/${id}`, request, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}),
	delete: (id: number): Promise<GraffitiPhotoResponse> =>
		axios.delete(`${baseUrl}/${id}`),
};

export default GraffitiPhotoAPI;
