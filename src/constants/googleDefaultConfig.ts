export let environment = process.env.NODE_ENV;

export let localApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export let apiKey =
	environment === "production"
		? "AIzaSyBMfzuPsW0IHNW1qFoFVPdbtirBf5cZ15o"
		: localApiKey;

export type Libraries = (
	| "geometry"
	| "places"
	| "drawing"
	| "localContext"
	| "visualization"
)[];

export interface GoogleConfig {
	key: string;
	googleMapsApiKey: string;
	libraries: Libraries;
	googleMapsUrl?: string;
	id?: string;
	preventGoogleFontsLoading?: boolean;
	language?: string;
	region?: string;
	version?: string;
	nonce?: string;
	mapIds?: string[];
	authReferrerPolicy?: "origin" | undefined;
}

// This is the default config for the Google Maps API

export const googleDefaultConfig: GoogleConfig = {
	key: apiKey,
	googleMapsApiKey: apiKey,
	libraries: ["places"],
};

export default googleDefaultConfig;
