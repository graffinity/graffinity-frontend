interface UserCreateRequest {
	email: string;
	username: string;
	password: string;
	name: string;
	lastname: string;
	birthdate?: Date;
}

export default UserCreateRequest;
