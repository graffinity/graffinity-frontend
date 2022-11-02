import { getStatus, setUserInfo } from "./store/common/commonActions";
import { store } from "./store/rootReducer";

const common = {
	getStatus: () => store.dispatch(getStatus()),
	setUserInfo: () => store.dispatch(setUserInfo()),
};

export default common;
