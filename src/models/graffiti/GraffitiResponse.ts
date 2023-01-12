import GraffitiPhotoResponse from "models/graffitiphoto/GraffitiPhotoResponse";

interface GraffitiResponse {
	loc: any;
	id: number;
	name: string;
	photos: GraffitiPhotoResponse[];
	description: string;
	latitude: number;
	longitude: number;
	authorId: number;
	creationDate: Date;
}

export default GraffitiResponse;
