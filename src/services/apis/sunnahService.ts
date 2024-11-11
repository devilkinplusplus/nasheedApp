import axios from "axios";
import { DataResponse, SunnahResponse } from "../responseTypes/sunnahResponse";



const axiosInstance = axios.create({
  baseURL: `https://localhost:7097/api/Sunnahs`,
});

export const getAllSunnahsAsync = async () : Promise<DataResponse> => {
    return axiosInstance.get("")
}