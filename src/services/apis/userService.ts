import axios from "axios";
import { UserResponse,CreateUserDto } from "../responseTypes/userResponse";


const axiosInstance = axios.create({
  baseURL: `https://nasheedapp-cbecgwc8hjhrctgu.canadacentral-01.azurewebsites.net/api/users/`,
});


export const createUserAsync =  (model:CreateUserDto)  => {
    return axiosInstance.post("",model);
}

