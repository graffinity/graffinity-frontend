interface ReportResponse {
	id: number;
	graffitiId: number;
	userId: number;
	createdAt: Date;
	reportReason: string;
	status: string;
}

export default ReportResponse;
