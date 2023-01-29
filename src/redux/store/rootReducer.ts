import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { commonSlice } from "./common/commonSlice";

export const rootReducer = combineReducers({
	common: commonSlice.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
