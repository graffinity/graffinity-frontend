import UserInfoResponse from "models/auth/UserInfoResponse";

interface CommonState {
	isLoggedIn?: boolean;
	userInfo?: UserInfoResponse;
}

export default CommonState;
