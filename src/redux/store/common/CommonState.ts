import UserInfoResponse from "models/auth/UserInfoResponse";

interface CommonState {
	loggedIn?: boolean;
	userInfo?: UserInfoResponse;
}

export default CommonState;
