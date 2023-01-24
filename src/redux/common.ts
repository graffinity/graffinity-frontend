import {
	getStatus,
	handleLogin,
	setUserInfo,
} from "./store/common/commonActions";
import { store } from "./store/rootReducer";

const common = {
	getStatus: () => store.dispatch(getStatus()),
	setUserInfo: (userId: number) => store.dispatch(setUserInfo(userId)),
	handleLogin: (isLoggedIn: boolean) => store.dispatch(handleLogin(isLoggedIn)),
};

export default common;
