import GraffitiPhotoResponse from "models/graffitiphoto/GraffitiPhotoResponse";

interface GraffitiResponse {
	loc: any;
	id: number;
	name: string;
	photos: GraffitiPhotoResponse[];
	description: string;
	location: string;
	authorId: number;
	creationDate: Date;
}

export default GraffitiResponse;
