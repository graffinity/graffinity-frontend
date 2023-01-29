import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import GraffitiRequest from "models/graffiti/GraffitiRequest";
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import SavedUserLocation from "models/map/SavedUserLocation";

const baseUrl = apiEndpoints.graffiti;

const GraffitiAPI = {
	findAll: (): Promise<GraffitiResponse[]> => axios.get(`${baseUrl}`),
	findById: (id: number): Promise<GraffitiResponse> =>
		axios.get(`${baseUrl}/${id}`),
	create: (request: GraffitiRequest): Promise<GraffitiResponse> =>
		axios.post(baseUrl, request),
	update: (id: number, request: GraffitiRequest): Promise<GraffitiResponse> =>
		axios.patch(`${baseUrl}/${id}`, request),
	delete: (id: number): Promise<GraffitiResponse> =>
		axios.delete(`${baseUrl}/${id}`),
	findNearbyGraffiti: (
		userLocation: SavedUserLocation
	): Promise<GraffitiResponse[]> => {
		return axios.get(
			`${baseUrl}/nearby/${userLocation.latitude}/${userLocation.longitude}`,
			{
				params: {
					savedAt: userLocation?.savedAt,
				},
			}
		);
	},
};

export default GraffitiAPI;
