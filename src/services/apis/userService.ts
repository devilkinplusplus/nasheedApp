import axios from "axios";
import { UserResponse,CreateUserDto } from "../responseTypes/userResponse";


const axiosInstance = axios.create({
  baseURL: `https://localhost:7097/api/users/`,
});


export const createUserAsync =  (model:CreateUserDto)  => {
    return axiosInstance.post("",model);
}

