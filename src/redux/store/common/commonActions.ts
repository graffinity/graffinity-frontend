import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import AuthAPI from "api/AuthAPI";
import UserAPI from "api/UserAPI";
import SavedUserLocation from "models/map/SavedUserLocation";
import { RootState } from "../rootReducer";
import { commonSlice } from "./commonSlice";

const commonActions = commonSlice.actions;

const getStatus =
	(): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
		let status = await AuthAPI.getStatus();
		if (status.isLoggedIn) {
			let response = await AuthAPI.getProfile();
			dispatch(commonActions.setStatus(status));
			dispatch(commonActions.setUserInfo({ userInfo: response }));
		} else {
			dispatch(commonActions.setStatus(status));
		}
	};

const setUserInfo =
	(userId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		let response = await UserAPI.getUserInfo(userId);
		dispatch(commonActions.setStatus({ ...response }));
	};

const getUserLocation =
	(): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					let userLocation: SavedUserLocation = {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						savedAt: new Date(),
					};
					dispatch(
						commonActions.setUserLocation({ userLocation: userLocation })
					);
				},
				(error) => {
					console.log(error);
					return;
				},
				{
					enableHighAccuracy: true, // true = use GPS, false = use IP address
					timeout: 120, // 2 * 60 = 120 seconds = 2 minutes
					maximumAge: 60 * 60 * 2, // 2 * 60 * 60 = 7200 seconds = 2 hours
				}
			);
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	};
const handleLogin =
	(isLoggedIn: boolean): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		dispatch(commonActions.handleLogin(isLoggedIn));
	};

export { getStatus, setUserInfo, getUserLocation, handleLogin };
