import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import GraffitiRequest from "models/graffiti/GraffitiRequest";
import GraffitiResponse from "models/graffiti/GraffitiResponse";

const baseUrl = apiEndpoints.graffiti;

const GraffitiPostAPI = {
  findAll: (): Promise<GraffitiResponse[]> => axios.get(baseUrl),
  create: (request: GraffitiRequest): Promise<GraffitiResponse> =>
    axios.post(baseUrl, request),
  update: (id: number, request: GraffitiRequest): Promise<GraffitiResponse> =>
    axios.patch(`${baseUrl}/${id}`, request),
  delete: (id: number): Promise<GraffitiResponse> =>
    axios.delete(`${baseUrl}/${id}`),
};

export default GraffitiPostAPI;
