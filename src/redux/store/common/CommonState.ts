import UserInfoResponse from "models/auth/UserInfoResponse";
import SavedUserLocation from "models/map/SavedUserLocation";

interface CommonState {
	isLoggedIn?: boolean;
	userInfo?: UserInfoResponse;
	userLocation?: SavedUserLocation;
	locationAccessStatus: LocationAccessStatus;
}

export enum LocationAccessStatus {
	NOT_REQUESTED = "NOT_REQUESTED",
	REQUESTED = "REQUESTED",
	GRANTED = "GRANTED",
	DENIED = "DENIED",
}

export default CommonState;
