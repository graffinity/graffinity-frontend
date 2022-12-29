import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import LoginRequest from "models/auth/LoginRequest";
import StatusResponse from "models/auth/StatusResponse";

const baseUrl = apiEndpoints.auth;

const AuthAPI = {
	login: async (request: LoginRequest) => {
		let res = axios.post(`${baseUrl}/login`, request);
		let temp = (await res).data;

		localStorage.setItem("token", temp.accessToken);
		return res;
	},

	getStatus: (): Promise<StatusResponse> => axios.get(`${baseUrl}/status`),

	logout: (): Promise<StatusResponse> => axios.get(`${baseUrl}/logout`),
};

export default AuthAPI;
