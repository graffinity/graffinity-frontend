import axios, { AxiosError } from "axios";

/**
 * It intercepts all requests  responses from the axios library and if there's an error, it
 * dispatches an alert action to the Redux store
 * @param {any} store - any - this is the Redux store that we'll use to dispatch actions.
 */
const setupAxiosInterceptors = () => {
	// const handleResponseError = (error: AxiosError) => {
	// 	store.dispatch(alertActions.addAlert(mapErrorToAlert(error)));
	// 	return Promise.reject(error);
	// };

	/* It's intercepting all responses and if there's an error, it calls the handleResponseError function. */
	axios.interceptors.response.use(
		(response) => {
			if (response.data) {
				if (response.status === 200 || response.status === 201) {
					return response.data;
				}
				return Promise.reject(response);
			}
			return Promise.reject(response);
		},
		(error: AxiosError) => {
			return Promise.reject(error);
		}
	);

	axios.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem("token");
			console.log("token", token);
			if (token) {
				if (config.headers) {
					axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
					config.headers["Authorization"] = `Bearer ${token}`;
				}
			}
			return config;
		},
		(error: AxiosError) => {
			return Promise.reject(error);
		}
	);
};

export default setupAxiosInterceptors;
