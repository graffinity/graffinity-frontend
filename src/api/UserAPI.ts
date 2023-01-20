import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import UserInfoResponse from "models/auth/UserInfoResponse";
import UserExistsParams from "models/user/UserExistsParams";

const baseUrl = apiEndpoints.user;

const UserAPI = {
	getUserInfo: (userId: number): Promise<UserInfoResponse> =>
		axios.get(`${baseUrl}/${userId}`),
	existsByUsername: (username: string): Promise<boolean> =>
		axios.get(`${baseUrl}/exist/${username}`),
	existsByEmail: (email: string): Promise<boolean> =>
		axios.get(`${baseUrl}/exist/${email}`),
};
export default UserAPI;
