import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import ReportResponse from "models/report/ReportResponse";

const baseUrl = apiEndpoints.report;

const ReportAPI = {
	findById: (id: string): Promise<ReportResponse> =>
		axios.get(`${baseUrl}/${id}`),
};

export default ReportAPI;
