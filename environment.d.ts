declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			GITHUB_AUTH_TOKEN: string;
			REACT_APP_GOOGLE_MAPS_API_KEY: string;
			PORT: number;
			PWD: string;
		}
	}
}

export {};
