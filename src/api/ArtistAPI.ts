import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import ArtistRequest from "models/artist/ArtistRequest";
import ArtistResponse from "models/artist/ArtistResponse";
const baseUrl = apiEndpoints.artist;

const ArtistAPI = {
	findById: (id: number) => axios.get(`${baseUrl}/${id}`),
	findAll: (): Promise<ArtistResponse[]> => axios.get(baseUrl),
	create: (artist: ArtistRequest) => axios.post(baseUrl, artist),
	update: (artist: ArtistRequest) => axios.put(baseUrl, artist),
	delete: (id: number) => axios.delete(`${baseUrl}/${id}`),
};

export default ArtistAPI;
