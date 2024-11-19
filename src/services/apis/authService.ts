import axios from "axios";
import { LoginDto, LoginResponse } from "../responseTypes/loginRespone";


const axiosInstance = axios.create({
  baseURL: `https://nasheedapp-cbecgwc8hjhrctgu.canadacentral-01.azurewebsites.net/api/auth/`,
});

export const loginAsync = async (model:LoginDto)   => {
    return axiosInstance.post("",model);
}

