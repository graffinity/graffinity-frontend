interface ReportRequest {
	id?: number;
	graffitiId: number;
	createdAt: Date;
	reportReason: string;
	status: string;
}

export default ReportRequest;
