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
	likePhoto: (id: number): Promise<GraffitiPhotoResponse> =>
		axios.put(`${baseUrl}/${id}/likes/add`),
	unlikePhoto: (id: number): Promise<GraffitiPhotoResponse> =>
		axios.put(`${baseUrl}/${id}/likes/remove`),
	getLikeCount: (id: number): Promise<number> =>
		axios.get(`${baseUrl}/${id}/likes/count`),
	isLikedByUser: (id: number): Promise<boolean> =>
		axios.get(`${baseUrl}/${id}/likes/is-liked`),
	addPhotoToGraffiti: (
		grafftiId: number,
		request: FormData
	): Promise<GraffitiPhotoResponse> =>
		axios.post(`${baseUrl}/graffiti/${grafftiId}/add-photo`, request, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}),
	uploadMultiplePhotos: (
		graffitiId: number,
		formData: FormData
	): Promise<number> =>
		axios.post(`${baseUrl}/graffiti/${graffitiId}/upload-multiple`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}),
};

export default GraffitiPhotoAPI;
