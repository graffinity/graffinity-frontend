import IFile from "models/file/IFile";

interface GraffitiPhotoRequest {
	id?: number;
	graffitiId: number;
	url: string;
	addedAt: Date;
	file: IFile;
	userId: number;
}

export default GraffitiPhotoRequest;
