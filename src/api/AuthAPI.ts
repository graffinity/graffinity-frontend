import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import LoginRequest from "models/auth/LoginRequest";
import StatusResponse from "models/auth/StatusResponse";
import { LoginResponse } from "pages/sandbox/Sandbox";

const baseUrl = apiEndpoints.auth;

const AuthAPI = {
	login: (request: LoginRequest): Promise<LoginResponse> => {
		return axios.post(`${baseUrl}/login`, request);
	},
	getStatus: (): Promise<StatusResponse> => axios.get(`${baseUrl}/status`),
};

export default AuthAPI;
