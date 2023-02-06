interface UserInfoResponse {
	userId: number;
	name?: string;
	lastname?: string;
	email: string;
	username: string;
	isAdmin: boolean;
	isLoggedIn?: boolean;
}

export default UserInfoResponse;
