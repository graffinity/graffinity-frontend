interface GraffitiRequest {
	id?: number;
	name: string;
	description: string;
	location: string;
	createdAt: Date;
	authorId: number;
	categoryIds: number[];
	artistIds: number[];
}

export default GraffitiRequest;
