import axios from "axios";

const AuthAPI = {
	login: (username: string, password: string) => {
		return axios.post("/auth/login", { username, password });
	},
};

export default AuthAPI;
