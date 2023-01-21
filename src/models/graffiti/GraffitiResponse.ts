import GraffitiPhotoResponse from "models/graffitiphoto/GraffitiPhotoResponse";

interface GraffitiResponse {
	id: number;
	name: string;
	photos: GraffitiPhotoResponse[];
	description: string;
	latitude: number;
	longitude: number;
	address: string;
	authorId: number;
	creationDate: Date;
}

export default GraffitiResponse;
