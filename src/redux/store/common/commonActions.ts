import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import AuthAPI from "api/AuthAPI";
import UserAPI from "api/UserAPI";
import { LoginResponse } from "pages/sandbox/Sandbox";
import { RootState } from "../rootReducer";
import { commonSlice } from "./commonSlice";

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
	(): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
		let response = await UserAPI.getUserInfo();
		dispatch(commonActions.setStatus({ ...response }));
	};

export { getStatus, setUserInfo };
