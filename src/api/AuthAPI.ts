import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import LoginRequest from "models/auth/LoginRequest";
import StatusResponse from "models/auth/StatusResponse";

const baseUrl = apiEndpoints.auth;

const AuthAPI = {
	login: async (request: LoginRequest) => {
		let res = axios.post(`${baseUrl}/login`, request);
		let temp = (await res).data;

		localStorage.setItem("token", temp.access_token);

		axios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${temp.access_token}`;

		return res;
	},

	signup: async (request: LoginRequest) => {
		let res = axios.post(`${baseUrl}/signup`, request);
		let temp = (await res).data;

		localStorage.setItem("token", temp.accessToken);
		return res;
	},

	getStatus: (): Promise<StatusResponse> => axios.get(`${baseUrl}/status`),

	getProfile: (): Promise<any> => axios.get(`${baseUrl}/profile`),

	logout: (): Promise<StatusResponse> => {
		axios.post(`${baseUrl}/logout`);
		localStorage.removeItem("token");
		axios.defaults.headers.common["Authorization"] = "";
		return axios.get(`${baseUrl}/status`);
	},
};

export default AuthAPI;
