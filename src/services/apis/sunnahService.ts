import axios from "axios";
import { DataResponse, SunnahResponse } from "../responseTypes/sunnahResponse";



const axiosInstance = axios.create({
  baseURL: `https://nasheedapp-cbecgwc8hjhrctgu.canadacentral-01.azurewebsites.net/api/Sunnahs`,
});

export const getAllSunnahsAsync = async () : Promise<DataResponse> => {
    return axiosInstance.get("")
}