import axios from "axios";
import apiEndpoints from "constants/apiEndpoints";
import CategoryResponse from "models/category/CategoryResponse";

const apiEndpoint = apiEndpoints.category;

const CategoryAPI = {
	findAll: (): Promise<CategoryResponse[]> => axios.get(`${apiEndpoint}`),

	// TODO: Add the rest of the CRUD operations
};

export default CategoryAPI;
