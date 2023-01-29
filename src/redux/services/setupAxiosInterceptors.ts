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

	const handleResponseError = async (error: AxiosError) => {
		if (error.response?.status === 401 || error.response?.status === 403) {
			// If forbidden or unauthorized, then move user to login page
			console.error(error.message);
		} else {
			console.error(error.response?.data || error.message);

			return await Promise.reject(error.message);

			// store.dispatch(alertActions.addAlert(mapErrorToAlert(error)));

			// return Promise.reject(error);
		}
	};

	const handleRequestError = async (error: AxiosError) => {
		console.error(error.message);
		return await Promise.reject(error.message);
	};

	/* It's intercepting all responses and if there's an error, it calls the handleResponseError function. */
	axios.interceptors.response.use(
		(response) => response.data,
		handleResponseError
	);

	axios.interceptors.request.use((config) => {
		const token = localStorage.getItem("token");
		if (token) {
			if (config.headers) {
				axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
				config.headers["Authorization"] = `Bearer ${token}`;
			}
		}
		return config;
	}, handleRequestError);
};

export default setupAxiosInterceptors;
