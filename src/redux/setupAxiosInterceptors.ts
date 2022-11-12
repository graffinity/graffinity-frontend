import axios from "axios";

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
  axios.interceptors.response.use((response) => response.data);
};

export default setupAxiosInterceptors;
