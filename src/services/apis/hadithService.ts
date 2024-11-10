import axios from "axios";
import { HadithResponse } from "../responseTypes/hadithResponse";
import { HadithBookType } from '../responseTypes/hadithBookType';


const axiosInstance = axios.create({
  baseURL: `https://random-hadith-generator.vercel.app/`,
});


export const getHadithAsync = async (book : HadithBookType = HadithBookType.Bukhari) : Promise<HadithResponse> => {
    return axiosInstance.get(`${book}`);
}

export const isHadithBookType = (value: any): value is HadithBookType => {
  return Object.values(HadithBookType).includes(value as HadithBookType);
};
