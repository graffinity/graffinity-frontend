interface UserInfoResponse {
	userId: number;
	name?: string;
	lastname?: string;
	email: string;
	username: string;
	isLoggedIn?: boolean;
}

export default UserInfoResponse;
