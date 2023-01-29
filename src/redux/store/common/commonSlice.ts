import CommonState from "./CommonState";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: CommonState = {
	isLoggedIn: undefined,
	userInfo: undefined,
	userLocation: undefined,
	gaveUserLocationPermission: undefined,
};

export const commonSlice = createSlice({
	name: "common",
	initialState: initialState,
	reducers: {
		setStatus(state, action) {
			state.isLoggedIn = action.payload.isLoggedIn;
		},
		setUserInfo(state, action) {
			state.userInfo = action.payload.userInfo;
		},
		setUserLocation(state, action) {
			state.userLocation = action.payload.userLocation;
		},
		setGaveUserLocationPermission(state, action) {
			state.gaveUserLocationPermission =
				action.payload.gaveUserLocationPermission;
		},
		handleLogin(state, action) {
			state.isLoggedIn = action.payload.isLoggedIn;
		},
	},
});

export const { setStatus, setUserInfo } = commonSlice.actions;
export default commonSlice.reducer;
