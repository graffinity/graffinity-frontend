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
		let lastUserLocation = localStorage.getItem("userLocation");
		if (lastUserLocation) {
			let userLocation: SavedUserLocation = JSON.parse(lastUserLocation);
			if (
				userLocation.savedAt &&
				new Date(userLocation.savedAt).getTime() >
					new Date().getTime() - 1000 * 60 * 10
			) {
				dispatch(commonActions.setUserLocation({ userLocation }));
				return;
			}
		}
		if (navigator?.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(location) => {
					if (!location.coords) return;
					let userLocation: SavedUserLocation = {
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						savedAt: new Date(),
					};
					localStorage.setItem("userLocation", JSON.stringify(userLocation));
					dispatch(
						commonActions.setUserLocation({ userLocation: userLocation })
					);
				},
				(error) => {
					console.log(error);
					navigator.geolocation.getCurrentPosition(
						(location) => {
							if (!location.coords) return;
							let userLocation: SavedUserLocation = {
								latitude: location.coords.latitude,
								longitude: location.coords.longitude,
								savedAt: new Date(),
							};

							localStorage.setItem(
								"userLocation",
								JSON.stringify(userLocation)
							);
							dispatch(
								commonActions.setUserLocation({ userLocation: userLocation })
							);
						},
						(error) => {
							console.log(error);
						},
						{
							enableHighAccuracy: false, // true = use GPS, false = use IP address
							timeout: 6000, //
							maximumAge: 0,
						}
					);
				},
				{
					enableHighAccuracy: true, // true = use GPS, false = use IP address
					timeout: 6000, //
					maximumAge: 0,
				}
			);
		} else {
			console.log("Geolocation is not supported by this browser.");
			alert("Geolocation is not supported by this browser.");
		}
	};
const handleLogin =
	(isLoggedIn: boolean): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		dispatch(commonActions.handleLogin(isLoggedIn));
	};

export { getStatus, setUserInfo, getUserLocation, handleLogin };
