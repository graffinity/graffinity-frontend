import LikeResponse from "./LikeResponse";

interface GraffitiPhotoResponse {
	id: number;
	graffitiId: number;
	url: string;
	userId: number;
	pictureScore: number | null;
	addedAt: Date;
	likes: LikeResponse[];
}

export default GraffitiPhotoResponse;
