import axios from "axios";
import { DataResponse, NasheedResponse } from "../responseTypes/nasheedResponse";

const axiosInstance = axios.create({
  baseURL: `https://localhost:7097/api/nasheeds/`,
});

export const getNasheedsAsync = async () => {
  return axiosInstance.get("nasheeds");
};
