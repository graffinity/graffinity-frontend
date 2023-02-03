import UserInfoResponse from "models/auth/UserInfoResponse";
import SavedUserLocation from "models/map/SavedUserLocation";

interface CommonState {
	isLoggedIn?: boolean;
	userInfo?: UserInfoResponse;
	userLocation?: SavedUserLocation;
	gaveUserLocationPermission?: boolean;
}

export default CommonState;
