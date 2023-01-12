import GraffitiStatus from "./GraffitiStatus";

interface GraffitiRequest {
	id?: number;
	name: string;
	description: string;
	latitude: string;
	longitude: string;
	status: GraffitiStatus;
	createdAt: Date;
	authorId: number;
	categoryIds: number[];
	artistIds: number[];
}

export default GraffitiRequest;
