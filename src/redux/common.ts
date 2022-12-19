import LoginResponse from "@/models/auth/LoginResponse";
import {
	getStatus,
	handleLogin,
	setUserInfo,
} from "./store/common/commonActions";
import { store } from "./store/rootReducer";

const common = {
	getStatus: (loginResponse?: LoginResponse) =>
		store.dispatch(getStatus(loginResponse)),
	setUserInfo: (userId: number) => store.dispatch(setUserInfo(userId)),
	handleLogin: (isLoggedIn: boolean) => store.dispatch(handleLogin(isLoggedIn)),
};

export default common;
