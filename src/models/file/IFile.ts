import { Readable } from "node:stream";

interface IFile {
	buffer: File;
	mimetype: string;
	originalname: string;
}

export default IFile;
