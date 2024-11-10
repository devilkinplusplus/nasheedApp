import axios from "axios";
import { LoginDto, LoginResponse } from "../responseTypes/loginRespone";


const axiosInstance = axios.create({
  baseURL: `https://localhost:7097/api/auth/`,
});

export const loginAsync = async (model:LoginDto)   => {
    return axiosInstance.post("",model);
}

