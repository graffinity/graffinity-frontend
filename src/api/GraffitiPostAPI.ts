import axios from "axios"
import apiEndpoints from "constants/apiEndpoints"
import GraffitiResponse from "models/graffiti/GraffitiResponse"

const baseUrl = apiEndpoints.graffiti

const GraffitiPostAPI = {
findAll: (): Promise<GraffitiResponse[]> => axios.get(baseUrl)
}

export default GraffitiPostAPI