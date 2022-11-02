import { LoginResponse } from "pages/sandbox/Sandbox";
import { getStatus, setUserInfo } from "./store/common/commonActions";
import { store } from "./store/rootReducer";

const common = {
	getStatus: (loginResponse?: LoginResponse) =>
		store.dispatch(getStatus(loginResponse)),
	setUserInfo: () => store.dispatch(setUserInfo()),
};

export default common;
