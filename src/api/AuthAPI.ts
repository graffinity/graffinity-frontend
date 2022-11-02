import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import StatusResponse from "models/auth/StatusResponse";

const baseUrl = apiEndpoints.auth;

const AuthAPI = {
	login: (username: string, password: string) => {
		return axios.post(`${baseUrl}/login`, { username, password });
	},
	getStatus: (): Promise<StatusResponse> => axios.get(`${baseUrl}/status`),
};

export default AuthAPI;
