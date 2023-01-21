import GraffitiPhotoResponse from "models/graffitiphoto/GraffitiPhotoResponse";

export interface MarkerData {
	id: number;
	name: string;
	position: {
		lat: number;
		lng: number;
	};
	photos: GraffitiPhotoResponse[];
}

export default MarkerData;
