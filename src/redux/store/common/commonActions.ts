import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import AuthAPI from "api/AuthAPI";
import UserAPI from "api/UserAPI";
import { RootState } from "../rootReducer";
import { commonSlice } from "./commonSlice";

const commonActions = commonSlice.actions;

const getStatus =
	(): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		let response = await AuthAPI.getStatus();
		dispatch(commonActions.setStatus({ ...response }));
	};

const setUserInfo =
	(): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		let response = await UserAPI.getUserInfo();
		dispatch(commonActions.setStatus({ ...response }));
	};

export { getStatus, setUserInfo };
