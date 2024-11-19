import axios from "axios";
import { DataResponse, NasheedResponse } from "../responseTypes/nasheedResponse";

const axiosInstance = axios.create({
  baseURL: `https://nasheedapp-cbecgwc8hjhrctgu.canadacentral-01.azurewebsites.net/api/nasheeds/`,
});

export const getNasheedsAsync = async () => {
  return axiosInstance.get("nasheeds");
};
