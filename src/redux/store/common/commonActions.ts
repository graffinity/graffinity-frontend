import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import AuthAPI from "api/AuthAPI";
import UserAPI from "api/UserAPI";
import { RootState } from "../rootReducer";
import { commonSlice } from "./commonSlice";
import LoginResponse from "models/auth/LoginResponse";

const commonActions = commonSlice.actions;

const getStatus =
	(
		loginResponse?: LoginResponse
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		if (!loginResponse) {
			AuthAPI.getStatus()
				.then((response) => {
					dispatch(commonActions.setStatus({ ...response }));
				})
				.catch((e) => {
					console.log(e.data);
				});
		} else {
			dispatch(commonActions.setStatus({ isLoggedIn: loginResponse.success }));
		}
	};

const setUserInfo =
	(userId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		let response = await UserAPI.getUserInfo(userId);
		dispatch(commonActions.setStatus({ ...response }));
	};
const handleLogin =
	(isLoggedIn: boolean): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		dispatch(commonActions.handleLogin(isLoggedIn));
	};

export { getStatus, setUserInfo, handleLogin };
