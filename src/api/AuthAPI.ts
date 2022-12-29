import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import LoginRequest from "models/auth/LoginRequest";
import StatusResponse from "models/auth/StatusResponse";

const baseUrl = apiEndpoints.auth;

const AuthAPI = {
	login: async (request: LoginRequest) => {
		let res = axios.post(`${baseUrl}/login`, request);
		let temp = (await res).data;
		console.log(temp);

		localStorage.setItem("token", temp.access_token);
		console.log(temp.access_token);
		console.log(localStorage.getItem("token"));

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

	logout: (): Promise<StatusResponse> => axios.get(`${baseUrl}/logout`),
};

export default AuthAPI;
