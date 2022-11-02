import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import UserInfoResponse from "models/auth/UserInfoResponse";

const baseUrl = apiEndpoints.user;

const UserAPI = {
	getUserInfo: (): Promise<UserInfoResponse> => axios.get(`${baseUrl}/${1}`),
};

export default UserAPI;
