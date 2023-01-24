import IFile from "models/file/IFile";

interface GraffitiPhotoRequest {
	id?: number;
	file: IFile;
	graffitiId: number;
	addedAt: Date;
}

export default GraffitiPhotoRequest;
