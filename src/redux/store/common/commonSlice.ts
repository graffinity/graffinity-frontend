import CommonState from "./CommonState";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: CommonState = {
	loggedIn: undefined,
	userInfo: undefined,
};

export const commonSlice = createSlice({
	name: "common",
	initialState: initialState,
	reducers: {
		setStatus(state, action) {
			state.loggedIn = action.payload.loggedIn;
		},
		setUserInfo(state, action) {
			state.userInfo = action.payload.me;
		},
	},
});

export const { setStatus, setUserInfo } = commonSlice.actions;
export default commonSlice.reducer;
