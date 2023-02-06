import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import LoginRequest from "models/auth/LoginRequest";
import StatusResponse from "models/auth/StatusResponse";
import UserCreateRequest from "models/user/UserCreateRequest";

const baseUrl = apiEndpoints.auth;

const AuthAPI = {
	login: async (request: LoginRequest) => {
		let res: {
			access_token: string;
			refresh_token: string;
		} = await axios.post(`${baseUrl}/login`, request);

		let access_token = res.access_token;
		if (access_token) {
			localStorage.setItem("token", access_token);

			axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
		}

		return res;
	},

	signup: async (request: UserCreateRequest) => {
		let res: {
			access_token: string;
			refresh_token: string;
		} = await axios.post(`${baseUrl}/signup`, request);

		let access_token = res.access_token;
		if (access_token) {
			localStorage.setItem("token", access_token);

			axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
		}

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
